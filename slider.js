document.addEventListener('DOMContentLoaded', function() {
  const sliderElement = document.querySelector('.CSSgal .slider');
  const bullets = document.querySelectorAll('.CSSgal .bullet');
  const slides = sliderElement.querySelectorAll(':scope > .slide');
  const artworkTarget = document.querySelector('.slider-container, .CSSgal');
  const swipeThreshold = 50;
  let currentIndex = 0;
  let pointerStart = null;
  let suppressClick = false;
  let userPaused = false;
  const delay = 5000; // 5 seconds delay for autoplay
  const interactionPause = 10000;
  let autoplayTimeout;
  let interactionResumeTimeout;
  const bulletsContainer = document.querySelector('.CSSgal .bullets');
  const sliderContainer = document.querySelector('.CSSgal');
  bulletsContainer.style.setProperty('--slider-autoplay-duration', `${delay}ms`);

  function moveSlider(index) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    bullets.forEach((bullet, bulletIndex) => {
      bullet.classList.remove('active');
      bullet.setAttribute('aria-pressed', String(bulletIndex === currentIndex));
    });
    void bullets[currentIndex].offsetWidth;
    bullets[currentIndex].classList.add('active');
    updateArtwork();
    startAutoplay();
  }

  function updateArtwork() {
    const background = slides[currentIndex].querySelector('[class$="-bc"]');
    const artwork = getComputedStyle(background).backgroundImage;
    artworkTarget.style.setProperty('--active-slide-artwork', artwork);
  }

  function startAutoplay() {
    if (userPaused) {
      return;
    }

    clearTimeout(autoplayTimeout);
    autoplayTimeout = setTimeout(() => {
      moveSlider(currentIndex + 1);
    }, delay);
  }

  function pauseAutoplayForInteraction() {
    userPaused = true;
    clearTimeout(autoplayTimeout);
    clearTimeout(interactionResumeTimeout);
    bulletsContainer.classList.add('is-paused');
    interactionResumeTimeout = setTimeout(() => {
      userPaused = false;
      bulletsContainer.classList.remove('is-paused');
      sliderContainer.classList.remove('is-paused');
      startAutoplay();
    }, interactionPause);
    bulletsContainer.classList.add('is-paused');
    sliderContainer.classList.add('is-paused');
  }

  bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', function() {
      pauseAutoplayForInteraction();
      moveSlider(index);
    });
  });

  sliderElement.addEventListener('pointerdown', function(event) {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) {
      return;
    }

    pointerStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
  });

  sliderElement.addEventListener('pointerup', function(event) {
    if (!pointerStart || pointerStart.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;
    pointerStart = null;

    if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    pauseAutoplayForInteraction();
    moveSlider(currentIndex + (deltaX < 0 ? 1 : -1));
    suppressClick = true;
    window.setTimeout(() => {
      suppressClick = false;
    }, 0);
  });

  sliderElement.addEventListener('pointercancel', function() {
    pointerStart = null;
  });

  sliderElement.addEventListener('click', function(event) {
    if (suppressClick) {
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    }
  }, true);

  sliderElement.addEventListener('dragstart', function(event) {
    event.preventDefault();
  });

  moveSlider(currentIndex);
});