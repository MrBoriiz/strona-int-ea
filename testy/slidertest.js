let currentIndex = 0;
let slideInterval;

function showNextSlide() {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function goToSlide(index) {
    clearInterval(slideInterval);
    currentIndex = index;
    const slides = document.querySelector('.slides');
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function startAutoplay() {
    slideInterval = setInterval(showNextSlide, 3000);
}

document.querySelectorAll('.nav-btn').forEach((button, index) => {
    button.addEventListener('click', () => {
        goToSlide(index);
    });
});

startAutoplay();