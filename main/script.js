document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // отменяем стандартную отправку

        // простая проверка обязательных полей
        const fullName = document.getElementById('fullName').value.trim();
        const school = document.getElementById('school').value.trim();
        const grade = document.getElementById('grade').value;
        const phone = document.getElementById('phone').value.trim();

        if (!fullName || !school || !grade || !phone) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        // здесь можно было бы отправить данные на сервер, если нужно

        // переходим на страницу теста
        window.location.href = 'test.html';
    });
});