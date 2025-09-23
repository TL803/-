    document.addEventListener('DOMContentLoaded', function () {
        const phoneInput = document.getElementById('calc-phone');

        if (phoneInput) {
            // Создаем маску для телефона
            const phoneMask = IMask(phoneInput, {
                mask: '+{7} (000) 000-00-00',
                // Опционально: можно добавить валидацию
                // validate: function (value) {
                //     return value.length === 18; // Проверяем, что введены все цифры
                // }
            });

            const carSelectionForm = document.getElementById('car-selection');
            if (carSelectionForm) {
                carSelectionForm.addEventListener('submit', function (event) {
                    if (!phoneMask.unmaskedValue || phoneMask.unmaskedValue.length < 10) {
                        event.preventDefault();
                        alert('Пожалуйста, введите корректный номер телефона.');
                        phoneInput.focus();
                    }
                });
            }
        }
    });