
  const countdown = () => {
    const launchDate = new Date('June 6, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
      // Countdown finished
      document.getElementById('countdown').innerHTML = "<p>OUT NOW!</p>";
      clearInterval(intervalId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  };

  const intervalId = setInterval(countdown, 1000);
  countdown(); // run once immediately on page load
