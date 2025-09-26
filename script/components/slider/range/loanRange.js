    const TOTAL_PRICE = 3_500_000;
    const ANNUAL_INTEREST_RATE = 12;

    function formatCurrency(value) {
      return new Intl.NumberFormat('ru-RU').format(Math.round(value)) + ' ₽';
    }

    function calculateMonthlyPayment(loanAmount, annualRate, termInYears) {
      if (loanAmount <= 0) return 0;
      const monthlyRate = annualRate / 100 / 12;
      const totalMonths = termInYears * 12;
      const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                      (Math.pow(1 + monthlyRate, totalMonths) - 1);
      return payment;
    }

    function updateSliderProgress(slider) {
      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 100;
      const val = parseFloat(slider.value);
      const percent = ((val - min) / (max - min)) * 100;

      slider.style.background = `linear-gradient(to right, #1e40af ${percent}%, #e5e7eb ${percent}%)`;
    }

    function updateProgressBar(percent) {
      const fill = document.getElementById('progressFill');
      if (fill) {
        fill.style.width = `${percent}%`;
      }
    }

    function init() {
      const loanTermSlider = document.getElementById('loanTermSlider');
      const initialPaymentSlider = document.getElementById('initialPaymentSlider');
      const initialPaymentAmount = document.getElementById('initialPaymentAmount');
      const monthlyPaymentDisplay = document.getElementById('monthlyPayment');

      if (!loanTermSlider || !initialPaymentSlider) {
        console.error('Слайдеры не найдены');
        return;
      }

      function updateDisplays() {
        const term = parseInt(loanTermSlider.value, 10);
        const percent = parseInt(initialPaymentSlider.value, 10);

        const initialAmount = (TOTAL_PRICE * percent) / 100;
        const loanAmount = TOTAL_PRICE - initialAmount;
        const monthly = calculateMonthlyPayment(loanAmount, ANNUAL_INTEREST_RATE, term);

        initialPaymentAmount.textContent = formatCurrency(initialAmount);
        monthlyPaymentDisplay.textContent = formatCurrency(monthly);

        updateProgressBar(percent);
      }

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

    document.addEventListener('DOMContentLoaded', init);