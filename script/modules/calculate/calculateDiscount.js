function calculateSetup(checkboxesSelector, totalElementId) {
    const checkboxes = document.querySelectorAll(checkboxesSelector);
    const totalElement = document.getElementById(totalElementId);

    if (!totalElement) {
        console.warn(`Элемент с id="${totalElementId}" не найден.`);
        return;
    }

    function calculateTotal() {
        let total = 0;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const card = checkbox.closest('.bg-white');
                if (!card) return;

                const priceElement = card.querySelector('[data-price]') || card.querySelector('b');
                let priceText = priceElement?.innerText || '';

                let price = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;

                total += price;
            }
        });

        totalElement.innerText = new Intl.NumberFormat('ru-RU').format(total) + ' ₽';
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });

    calculateTotal();
}

document.addEventListener('DOMContentLoaded', function () {
    calculateSetup('input[type="checkbox"][data-toggle-count]', 'total-amount');
});