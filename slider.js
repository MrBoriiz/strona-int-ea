document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');
  const nextButton = document.querySelector('#nextButton');
  const prevButton = document.querySelector('#prevButton');
  const bullets = document.querySelectorAll('.bullet');
  let currentIndex = 0;
  const maxIndex = 2; // 200% / 100%
  const delay = 5000; // 5 seconds delay for autoplay
  let autoplayInterval;

  function moveSlider(index) {
    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    slider.style.webkitTransform = `translateX(-${currentIndex * 100}%)`;
    updateBullets();
  }

  function updateBullets() {
    bullets.forEach((bullet, index) => {
      if (index === currentIndex) {
        bullet.classList.add('active');
      } else {
        bullet.classList.remove('active');
      }
    });
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % (maxIndex + 1);
      moveSlider(currentIndex);
    }, delay);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  nextButton.addEventListener('click', function() {
    stopAutoplay();
    currentIndex = (currentIndex + 1) % (maxIndex + 1);
    moveSlider(currentIndex);
  });

  prevButton.addEventListener('click', function() {
    stopAutoplay();
    currentIndex = (currentIndex - 1 + (maxIndex + 1)) % (maxIndex + 1);
    moveSlider(currentIndex);
  });

  startAutoplay();
  updateBullets();
});