window.addEventListener('DOMContentLoaded', () => {
  function setupCarousel(rowId) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const slides = Array.from(row.querySelectorAll('.card'));
    const totalSlides = slides.length;
    let currentSlide = 0;

    function updateCarousel() {
      const isMobile = window.innerWidth < 768;
      const containerWidth = row.parentElement.clientWidth;

      if (isMobile) {
        row.style.display = 'flex';
        row.style.overflow = 'hidden';
        row.style.transition = 'transform 0.3s ease';
        row.style.width = `${totalSlides * containerWidth}px`;

        slides.forEach(slide => {
          slide.style.flex = '0 0 100%';
          slide.style.width = `${containerWidth * 1}px`;
          slide.style.margin = `0 ${containerWidth * 0.05}px`;
        });

        const offset = -currentSlide * containerWidth;
        row.style.transform = `translateX(${offset}px)`;
      } else {
        // Reset for desktop
        row.style.width = '';
        row.style.transform = 'none';
        slides.forEach(slide => {
          slide.style.width = '';
          slide.style.margin = '';
          slide.style.flex = '';
        });
        currentSlide = 0;
      }
    }

    function moveCarousel(direction) {
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
    }

    // expose global control (optional)
    window[`moveCarousel_${rowId}`] = moveCarousel;

    updateCarousel();
    window.addEventListener('resize', updateCarousel);
  }

  // Инициализирай и двата реда:
  setupCarousel('latest-carousel');
  setupCarousel('latest-carousel-hidden');
  setupCarousel("saved-carousel");
});

