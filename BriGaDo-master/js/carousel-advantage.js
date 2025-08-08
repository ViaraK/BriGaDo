window.addEventListener('DOMContentLoaded', () => {
  const row = document.getElementById('carousel');
  const slides = Array.from(row.querySelectorAll('.image-advantage'));
  const totalSlides = slides.length;
  let currentSlide = 0;

  function updateCarousel() {
    const isMobile = window.innerWidth < 768;
    const containerWidth = row.parentElement.clientWidth;

    if (isMobile) {
      row.style.width = `${totalSlides * containerWidth}px`;
      slides.forEach(slide => {
        slide.style.width = `${containerWidth * 0.9}px`; // 90% width as per CSS
        slide.style.margin = `0 ${containerWidth * 0.05}px`; // 5% margin on sides
      });

      const offset = -currentSlide * containerWidth;
      row.style.transform = `translateX(${offset}px)`;
    } else {
      // Reset for desktop
      row.style.width = '';
      slides.forEach(slide => {
        slide.style.width = '';
        slide.style.margin = '';
      });
      row.style.transform = 'none';
      currentSlide = 0;
    }
  }

  window.moveCarousel = function(direction) {
    if (window.innerWidth >= 768) return;

    currentSlide += direction;
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;

    const containerWidth = row.parentElement.clientWidth;
    const offset = -currentSlide * containerWidth;
    row.style.transition = 'transform 0.3s ease';
    row.style.transform = `translateX(${offset}px)`;

    setTimeout(() => {
      row.style.transition = '';
    }, 300);
  };

  updateCarousel();

  window.addEventListener('resize', () => {
    updateCarousel();
  });
});
