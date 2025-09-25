const parseNumber = (str, fallback = 0) => {
  const num = parseFloat(str?.trim());
  return isNaN(num) ? fallback : num;
};

const parseTerm = (str) => {
  const num = parseInt(str?.trim(), 10);
  return Math.max(1, Math.min(8, isNaN(num) ? 5 : num)); // 1–8 лет
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const calculateMonthlyPayment = (carPrice, downPayment, termYears) => {
  const loanAmount = carPrice - downPayment;
  const months = termYears * 12;
  return months > 0 ? loanAmount / months : 0;
};

const SELECTORS = {
  mobile: {
    carPrice: '#car-price-mobile',
    downPayment: '#down-payment-mobile',
    termSlider: '.md\\:hidden input[type="range"]',
    paymentDisplay: '.monthly-payment-mobile'
  },
  desktop: {
    carPrice: '#car-price',
    downPayment: '#down-payment',
    termSlider: '.hidden.md\\:block input[type="range"]',
    termDisplay: '.term-years',
    paymentDisplay: '.monthly-payment-desktop'
  },
  sliders: '.credit-slider',
  inputs: 'input[type="number"], input[type="range"]'
};

const getValues = (doc, isMobile) => {
  const sel = isMobile ? SELECTORS.mobile : SELECTORS.desktop;
  
  const carPrice = parseNumber(doc.querySelector(sel.carPrice)?.value);
  const downPayment = parseNumber(doc.querySelector(sel.downPayment)?.value);
  const term = parseTerm(doc.querySelector(sel.termSlider)?.value);
  
  return { carPrice, downPayment, term };
};

const updateTermDisplay = (doc, isMobile, term) => {
  if (isMobile) return;
  
  const el = doc.querySelector(SELECTORS.desktop.termDisplay);
  if (!el) return;
  
  if (term === 1) el.textContent = '1 год';
  else if (term >= 2 && term <= 4) el.textContent = `${term} года`;
  else el.textContent = `${term} лет`;
};

const updatePaymentDisplay = (doc, isMobile, value) => {
  const selector = isMobile 
    ? SELECTORS.mobile.paymentDisplay 
    : SELECTORS.desktop.paymentDisplay;
    
  const el = doc.querySelector(selector);
  if (el) el.textContent = formatCurrency(value);
};

const updateSliderProgress = (slider) => {
  const min = parseFloat(slider.min) || 1;
  const max = parseFloat(slider.max) || 8;
  const val = parseFloat(slider.value) || min;
  const percent = ((val - min) / (max - min)) * 100;
  slider.style.setProperty('--progress', `${percent}%`);
};

const createInputHandler = (win, doc) => () => {
  const isMobile = win.innerWidth < 768;
  const { carPrice, downPayment, term } = getValues(doc, isMobile);
  const monthlyPayment = calculateMonthlyPayment(carPrice, downPayment, term);
  
  updateTermDisplay(doc, isMobile, term);
  updatePaymentDisplay(doc, isMobile, monthlyPayment);
  
};

const initCalculator = (win, doc) => {
  const handleInput = createInputHandler(win, doc);
  
  doc.querySelectorAll(SELECTORS.sliders).forEach(slider => {
    updateSliderProgress(slider);
    slider.addEventListener('input', () => {
      updateSliderProgress(slider);
      handleInput();
    });
  });
  
  doc.querySelectorAll(SELECTORS.inputs).forEach(input => {
    if (input.type !== 'range') {
      input.addEventListener('input', handleInput);
    }
  });
  
  handleInput();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initCalculator(window, document));
} else {
  initCalculator(window, document);
}