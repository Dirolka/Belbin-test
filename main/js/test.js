document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        'Мне важно доводить работу до идеального результата.',
        'Я замечаю мелкие ошибки, которые другие пропускают.',
        'Мне комфортно работать в роли эксперта по узкой теме.',
        'Я чувствую тревогу, если работа выполнена не на 100%.',
        'Я предпочитаю качественно проверять задачи перед сдачей.',
        'Я люблю разрабатывать глубокие знания в одной сфере.',
        'Мне не нравится, когда работа сделана поспешно.',
        'Я лучше работаю самостоятельно, чем в шумной команде.',
        'Я легко концентрируюсь на деталях.',
        'Я нахожу ошибки в чужой работе быстрее большинства.',
        'Я предпочитаю выполнять задачи последовательно, без спешки.',
        'Я часто являюсь человеком, к которому идут за точным ответом.'
    ];

    let currentIndex = 0;
    const answers = new Array(questions.length).fill(null);

    const questionTextEl = document.getElementById('questionText');
    const progressEl = document.getElementById('progress');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function renderQuestion() {
        questionTextEl.textContent = questions[currentIndex];
        progressEl.textContent = `${currentIndex + 1} из ${questions.length}`;

        const radios = document.querySelectorAll('input[name="answer"]');
        radios.forEach((r) => {
            r.checked = answers[currentIndex] === r.value;
        });

        prevBtn.disabled = currentIndex === 0;
        nextBtn.textContent = currentIndex === questions.length - 1 ? 'Завершить' : 'Далее';
    }

    function getSelectedAnswer() {
        const selected = document.querySelector('input[name="answer"]:checked');
        return selected ? selected.value : null;
    }

    prevBtn.addEventListener('click', () => {
        const answer = getSelectedAnswer();
        if (answer !== null) {
            answers[currentIndex] = answer;
        }

        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    });

    nextBtn.addEventListener('click', () => {
    const answer = getSelectedAnswer();
    if (answer === null) {
        alert('Пожалуйста, выберите вариант ответа.');
        return;
    }

    answers[currentIndex] = answer;

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        // === СЧИТАЕМ БАЛЛЫ И СОХРАНЯЕМ ===
        const numericAnswers = answers.map((a) => Number(a) || 0);

        // вопросы считаем с 1:
        // 1,2,4,5,7,9,10,11 → Доводчик
        // 3,6,8,12          → Специалист

        const finisherQuestions = [1, 2, 4, 5, 7, 9, 10, 11];
        const specialistQuestions = [3, 6, 8, 12];

        const sumByQuestions = (questionNumbers) =>
            questionNumbers.reduce((sum, qNum) => {
                const index = qNum - 1; // в массиве answers индекс = номер - 1
                return sum + (numericAnswers[index] || 0);
            }, 0);

        const finisher = sumByQuestions(finisherQuestions);      // score_finisher
        const specialist = sumByQuestions(specialistQuestions);  // score_specialist

        // сохраняем только то, что нужно для ролей
        localStorage.setItem(
            'testScores',
            JSON.stringify({ finisher, specialist })
        );

        // переходим на страницу результатов
        window.location.href = 'resulsts.html';
    }
});
    renderQuestion();
});