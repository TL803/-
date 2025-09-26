document.addEventListener('DOMContentLoaded', () => {
    const TOTAL_PRICE = 3_500_000; 
    const MIN_TERM = 1; 
    const MAX_TERM = 7;

    const loanTermSlider = document.getElementById('loanTermSlider');
    const initialPaymentSlider = document.getElementById('initialPaymentSlider');
    const initialPaymentAmount = document.getElementById('initialPaymentAmount');
    const monthlyPaymentDisplay = document.getElementById('monthlyPayment');

    if (!loanTermSlider || !initialPaymentSlider || !initialPaymentAmount) {
        console.warn('Один или несколько элементов не найдены');
        return;
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('ru-RU').format(Math.round(value)) + ' ₽';
    }

    function calculateLeasingPayment(totalPrice, downPaymentPercent, termInYears) {
        const downPayment = (totalPrice * downPaymentPercent) / 100;
        const leasingAmount = totalPrice - downPayment;
        const totalMonths = termInYears * 12;
        return totalMonths > 0 ? leasingAmount / totalMonths : 0;
    }

    function updateSliderProgress(slider) {
        const min = parseFloat(slider.min) || 0;
        const max = parseFloat(slider.max) || 100;
        const val = parseFloat(slider.value);
        const percent = ((val - min) / (max - min)) * 100;

        slider.style.background = `linear-gradient(to right, #1e40af ${percent}%, #e5e7eb ${percent}%)`;
    }

    function updateDisplays() {
        const term = parseInt(loanTermSlider.value, 10);
        const downPercent = parseInt(initialPaymentSlider.value, 10);

        const downAmount = (TOTAL_PRICE * downPercent) / 100;
        const monthly = calculateLeasingPayment(TOTAL_PRICE, downPercent, term);

        initialPaymentAmount.textContent = formatCurrency(downAmount);
        if (monthlyPaymentDisplay) {
            monthlyPaymentDisplay.textContent = formatCurrency(monthly);
        }
    }

    function init() {
        updateSliderProgress(loanTermSlider);
        updateSliderProgress(initialPaymentSlider);
        updateDisplays();

        loanTermSlider.addEventListener('input', () => {
            updateSliderProgress(loanTermSlider);
            updateDisplays();
        });

        initialPaymentSlider.addEventListener('input', () => {
            updateSliderProgress(initialPaymentSlider);
            updateDisplays();
        });
    }

    init();
});