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
    const answerBtns = document.querySelectorAll('#answers button');

    function renderQuestion() {
        // плавное исчезновение и появление
        questionTextEl.parentElement.classList.remove('show');
        setTimeout(() => {
            questionTextEl.textContent = questions[currentIndex];
            progressEl.textContent = `${currentIndex + 1} из ${questions.length}`;

            // сброс выделений
            answerBtns.forEach(btn => btn.classList.remove('selected'));

            // если уже отвечали — выделяем кнопку
            if (answers[currentIndex] !== null) {
                const btnToSelect = Array.from(answerBtns).find(btn => btn.dataset.value == answers[currentIndex]);
                if (btnToSelect) btnToSelect.classList.add('selected');
            }

            prevBtn.disabled = currentIndex === 0;

            questionTextEl.parentElement.classList.add('show');
        }, 150);
    }

    function goNext(value) {
        answers[currentIndex] = value;

        if (currentIndex < questions.length - 1) {
            currentIndex++;
            renderQuestion();
        } else {
            // Подсчет результатов
            const numericAnswers = answers.map(a => Number(a) || 0);

            const finisherQuestions = [1, 2, 4, 5, 7, 9, 10, 11];
            const specialistQuestions = [3, 6, 8, 12];

            const sumByQuestions = (questionNumbers) =>
                questionNumbers.reduce((sum, qNum) => {
                    const index = qNum - 1;
                    return sum + (numericAnswers[index] || 0);
                }, 0);

            const finisher = sumByQuestions(finisherQuestions);
            const specialist = sumByQuestions(specialistQuestions);

            localStorage.setItem('testScores', JSON.stringify({ finisher, specialist }));
            window.location.href = 'results.html';
        }
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    });

    // События для кнопок
    answerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // подсветка выбранной кнопки
            answerBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // автоматический переход через 0.8 секунды
            setTimeout(() => {
                goNext(btn.dataset.value);
            }, 800);
        });
    });

    renderQuestion();
});
