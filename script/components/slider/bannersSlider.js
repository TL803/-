function initSlider() {
  const slider = document.getElementById('slider');
  if (!slider) {
    console.error('Slider element not found');
    return;
  }

  const slides = slider.children;
  const slideCount = slides.length;
  const slideWidth = () => slider.offsetWidth;

  let state = {
    isDragging: false,
    currentIndex: 0,
    startPos: 0,
    currentTranslate: 0,
    prevTranslate: 0,
  };

  const applyTransform = () => {
    slider.style.transform = `translateX(${state.prevTranslate}px)`;
  };

  const getPointerX = (e) => {
    if (e.type.includes('mouse')) return e.pageX;
    if (e.touches && e.touches.length > 0) return e.touches[0].clientX;
    return 0;
  };

  const getTranslateForIndex = (index) => {
    return -index * slideWidth();
  };

  const goToSlide = (index) => {
    const clampedIndex = Math.max(0, Math.min(slideCount - 1, index));
    state.currentIndex = clampedIndex;
    state.prevTranslate = getTranslateForIndex(clampedIndex);
    slider.style.transition = 'transform 0.5s ease';
    applyTransform();
    updateIndicators();
  };

  const animate = () => {
    if (!state.isDragging) return;
    state.currentTranslate = state.prevTranslate + (getPointerX(moveEvent) - state.startPos);
    slider.style.transition = 'none';
    applyTransform();
    requestAnimationFrame(animate);
  };

  let moveEvent = null;

  const handleStart = (e) => {
    e.preventDefault();
    state.isDragging = true;
    state.startPos = getPointerX(e);
    moveEvent = e;
    requestAnimationFrame(animate);
  };

  const handleMove = (e) => {
    if (!state.isDragging) return;
    moveEvent = e;
  };

  const handleEnd = () => {
    if (!state.isDragging) return;
    state.isDragging = false;

    const movedBy = state.currentTranslate - state.prevTranslate;

    if (movedBy < -50 && state.currentIndex < slideCount - 1) {
      goToSlide(state.currentIndex + 1);
    } else if (movedBy > 50 && state.currentIndex > 0) {
      goToSlide(state.currentIndex - 1);
    } else {
      goToSlide(state.currentIndex);
    }
  };

  const updateIndicators = () => {
    const indicatorsContainer = document.querySelector('.absolute.bottom-4');
    if (!indicatorsContainer) return;

    Array.from(indicatorsContainer.children).forEach((dot, index) => {
      dot.classList.toggle('bg-white', index === state.currentIndex);
      dot.classList.toggle('bg-opacity-80', index !== state.currentIndex);
    });
  };

  const initIndicators = () => {
    const container = document.querySelector('.absolute.bottom-4');
    if (!container) return;

    container.innerHTML = ''; 
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.className = `w-2 h-2 rounded-full ${
        i === state.currentIndex ? 'bg-white' : 'bg-white bg-opacity-80'
      }`;
      container.appendChild(dot);
    }
  };

  const bindEvents = () => {
    slider.addEventListener('mousedown', handleStart);
    slider.addEventListener('touchstart', handleStart, { passive: false });

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: false });

    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);

    window.addEventListener('resize', () => {
      goToSlide(state.currentIndex);
    });
  };

  const init = () => {
    state.prevTranslate = getTranslateForIndex(state.currentIndex);
    applyTransform();

    initIndicators();
    updateIndicators();

    bindEvents();
  };

  init();

  return {
    goTo: goToSlide,
    next: () => goToSlide(state.currentIndex + 1),
    prev: () => goToSlide(state.currentIndex - 1),
    currentIndex: () => state.currentIndex,
  };
}

document.addEventListener('DOMContentLoaded', () => {
  window.slider = initSlider();
});