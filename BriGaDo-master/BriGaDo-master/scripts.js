// Мобилно меню toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("active");
});

// Карусел логика
let currentSlide = 0;
const slides = document.getElementById("slides");
const totalSlides = slides.children.length;

function showSlide(index) {
  currentSlide = index % totalSlides;
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }
  slides.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
}

// Автоматично въртене на слайдовете
setInterval(() => {
  showSlide(currentSlide + 1);
}, 3000);


window.nextSlide = function () {
  showSlide(currentSlide + 1);
};
