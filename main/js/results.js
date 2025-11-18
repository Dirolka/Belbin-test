document.addEventListener('DOMContentLoaded', () => {
    const summaryRolesEl = document.getElementById('summary-roles');
    const summaryDescriptionEl = document.getElementById('summary-description');
    const summaryRisksEl = document.getElementById('summary-risks');
    const summaryRecommendationsEl = document.getElementById('summary-recommendations');

    let scores = null;
    try {
        const raw = localStorage.getItem('testScores');
        if (raw) {
            scores = JSON.parse(raw);
        }
    } catch (e) {
        console.error('Ошибка чтения testScores из localStorage', e);
    }

    // Если нет сохранённых результатов — оставляем заглушку
    if (!scores) {
        summaryRolesEl.textContent = 'Результаты не найдены';
        summaryDescriptionEl.textContent =
            'Пройдите тест, чтобы увидеть ваш профиль роли.';
        summaryRisksEl.textContent = '';
        summaryRecommendationsEl.textContent = '';
        return;
    }

    const { finisher, specialist } = scores;

    const diff = Math.abs(finisher - specialist);
    let roleType; // 'finisher' | 'specialist' | 'mixed'

    if (diff <= 3) {
        roleType = 'mixed';
    } else if (finisher > specialist) {
        roleType = 'finisher';
    } else {
        roleType = 'specialist';
    }

    if (roleType === 'finisher') {
        summaryRolesEl.textContent = 'Ведущая роль: Доводчик';
        summaryDescriptionEl.textContent =
            'Ты человек, который контролирует качество выполнения и доводит навыки до устойчивого уровня. ' +
            'Ты уменьшаешь число ошибок, обеспечиваешь стабильность и аккуратность.';

        summaryRisksEl.textContent =
            'Перфекционизм, медленный вход в работу, тревожность перед ошибками.';

        summaryRecommendationsEl.textContent =
            'Используй правило «80% достаточно», делай 10-минутную разминку, ' +
            'работай сериями по 5 задач.';
    } else if (roleType === 'specialist') {
        summaryRolesEl.textContent = 'Ведущая роль: Специалист';
        summaryDescriptionEl.textContent =
            'Ты обладаешь глубокими знаниями и стремишься совершенствовать экспертность. ' +
            'Ты приносишь в команду профессиональную глубину и точность.';

        summaryRisksEl.textContent =
            'Узкая специализация, склонность работать в одиночку, завышенные стандарты.';

        summaryRecommendationsEl.textContent =
            'Развивай смежные навыки, регулярно делись знаниями с другими, ' +
            'ставь реалистичные дедлайны и проверяй, не завышаешь ли критерии качества без необходимости.';
    } else {
        // Смешанный профиль
        summaryRolesEl.textContent = 'Ведущие роли: Доводчик + Специалист';

        summaryDescriptionEl.textContent =
            'Ты сочетание аккуратности и глубокой экспертности. ' +
            'Ты не только знаешь тонкости темы, но и умеешь вычищать ошибки и делать работу максимально качественно.';

        summaryRisksEl.textContent =
            'Высокие стандарты, риск перфекционизма и перегрузки, ' +
            'возможный медленный старт из‑за стремления сделать всё идеально.';

        summaryRecommendationsEl.textContent =
            'Используй правило «80% достаточно», работай сериями по 5 задач, ' +
            'начинай с короткой разминки, веди журнал ошибок и чек-лист, ' +
            'чтобы снимать напряжение и не застревать на деталях.';
    }
});