    // === Слайдер ===
    const slider = document.getElementById('slider');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let currentIndex = 0;
    const slides = slider.children;
    const slideCount = slides.length;

    // Обновление позиции
    const updateSlider = () => {
      slider.style.transform = `translateX(${prevTranslate}px)`;
    };

    // Анимация при перетаскивании
    const animation = () => {
      currentTranslate = prevTranslate + (currentX - startPos);
      updateSlider();
      if (isDragging) requestAnimationFrame(animation);
    };

    let currentX;

    const getPositionX = (e) => {
      return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    };

    const start = (e) => {
      isDragging = true;
      startPos = getPositionX(e);
      animationID = requestAnimationFrame(animation);
      slider.style.transition = 'none';
    };

    const end = () => {
      isDragging = false;
      cancelAnimationFrame(animationID);

      const movedBy = currentTranslate - prevTranslate;

      // Если сдвиг больше 50px — переключаем слайд
      if (movedBy < -50 && currentIndex < slideCount - 1) currentIndex++;
      if (movedBy > 50 && currentIndex > 0) currentIndex--;

      // Ограничиваем индекс
      currentIndex = Math.max(0, Math.min(slideCount - 1, currentIndex));

      // Фиксируем позицию
      prevTranslate = -(currentIndex * slider.offsetWidth);
      slider.style.transition = 'transform 0.5s ease';
      updateSlider();

      // Обновляем индикаторы
      updateIndicators();
    };

    const move = (e) => {
      if (isDragging) {
        currentX = getPositionX(e);
      }
    };

    // События
    slider.addEventListener('mousedown', start);
    slider.addEventListener('touchstart', start);

    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move, { passive: false });

    document.addEventListener('mouseup', end);
    document.addEventListener('touchend', end);

    // === Таймер ===
    function startTimer() {
      let timeLeft = {
        days: 4,
        hours: 11,
        minutes: 40,
        seconds: 59
      };

      const update = () => {
        if (timeLeft.seconds > 0) {
          timeLeft.seconds--;
        } else {
          if (timeLeft.minutes > 0) {
            timeLeft.minutes--;
            timeLeft.seconds = 59;
          } else {
            if (timeLeft.hours > 0) {
              timeLeft.hours--;
              timeLeft.minutes = 59;
              timeLeft.seconds = 59;
            } else {
              if (timeLeft.days > 0) {
                timeLeft.days--;
                timeLeft.hours = 23;
                timeLeft.minutes = 59;
                timeLeft.seconds = 59;
              } else {
                // Таймер закончился
                clearInterval(timer);
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
              }
            }
          }
        }

        document.getElementById('days').textContent = String(timeLeft.days).padStart(2, '0');
        document.getElementById('hours').textContent = String(timeLeft.hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(timeLeft.minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(timeLeft.seconds).padStart(2, '0');
      };

      const timer = setInterval(update, 1000);
      update(); // сразу показать
    }

    // Запускаем таймер
    startTimer();

    // Обновление индикаторов
    function updateIndicators() {
      const indicators = document.querySelector('.absolute.bottom-4').children;
      for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.toggle('bg-white', i === currentIndex);
        indicators[i].classList.toggle('bg-opacity-80', i !== currentIndex);
      }
    }

    // Инициализируем индикаторы
    updateIndicators();