function getBurgerElements() {
  const overlay = document.getElementById('overlay');
  const burger = document.getElementById('burger');
  const toggleButton = document.getElementById('toggle-burger');

  if (!overlay || !burger || !toggleButton) {
    console.warn('Бургер-меню: не найдены необходимые элементы');
    return null;
  }

  return { overlay, burger, toggleButton };
}

function closeBurger({ burger, overlay, toggleButton }) {
  burger.classList.add('hidden');
  overlay.classList.add('hidden');
  toggleButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('overflow-hidden'); // Разблокируем скролл
}

function openBurger({ burger, overlay, toggleButton }) {
  burger.classList.remove('hidden');
  overlay.classList.remove('hidden');
  toggleButton.setAttribute('aria-expanded', 'true');
  document.body.classList.add('overflow-hidden'); // Блокируем скролл
}

function toggleBurgerState(burgerData) {
  const { toggleButton } = burgerData;
  const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    closeBurger(burgerData);
  } else {
    openBurger(burgerData);
  }
}

function prepareBurger() {
  const elements = getBurgerElements();
  if (!elements) return;

  const { overlay, burger, toggleButton } = elements;

  // Устанавливаем начальное состояние
  toggleButton.setAttribute('aria-expanded', 'false');
  toggleButton.setAttribute('aria-controls', 'burger');

  // Обработчики
  const handleClickToggle = () => toggleBurgerState(elements);
  const handleClickOverlay = () => closeBurger(elements);

  toggleButton.addEventListener('click', handleClickToggle);
  overlay.addEventListener('click', handleClickOverlay);

  // Закрытие по Escape
  const handleEscape = (e) => {
    if (e.key === 'Escape' && !burger.classList.contains('hidden')) {
      closeBurger(elements);
    }
  };

  document.addEventListener('keydown', handleEscape);

  // 💡 Дополнительно: переключать видимость при изменении ширины экрана
  function checkScreenSize() {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // Восстанавливаем обработчики, если они были удалены
      toggleButton.addEventListener('click', handleClickToggle);
      overlay.addEventListener('click', handleClickOverlay);
      document.addEventListener('keydown', handleEscape);
    } else {
      // Скрываем меню и удаляем обработчики (опционально)
      closeBurger(elements);
      toggleButton.removeEventListener('click', handleClickToggle);
      overlay.removeEventListener('click', handleClickOverlay);
      document.removeEventListener('keydown', handleEscape);
    }
  }

  // Проверяем при загрузке
  checkScreenSize();

  // Проверяем при ресайзе
  window.addEventListener('resize', checkScreenSize);
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', prepareBurger);