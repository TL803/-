function startTimer() {
  let timeLeft = {
    days: 4,
    hours: 11,
    minutes: 40,
    seconds: 59
  };

  const update = () => {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

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
            clearInterval(timer);
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
          }
        }
      }
    }

    daysEl.textContent = String(timeLeft.days).padStart(2, '0');
    hoursEl.textContent = String(timeLeft.hours).padStart(2, '0');
    minutesEl.textContent = String(timeLeft.minutes).padStart(2, '0');
    secondsEl.textContent = String(timeLeft.seconds).padStart(2, '0');
  };

  const timer = setInterval(update, 1000);
  update();
}

startTimer();