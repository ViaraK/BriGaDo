window.addEventListener('DOMContentLoaded', () => {
  const row = document.getElementById('carousel');
  const slides = Array.from(row.querySelectorAll('.image-about'));
  const totalSlides = slides.length;
  let currentSlide = 0;
  let autoSlideInterval;

  function updateCarousel() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      const containerWidth = row.parentElement.clientWidth;
      
      row.style.width = `${totalSlides * containerWidth}px`;
      slides.forEach(slide => {
        slide.style.width = `${containerWidth}px`;
      });
      
      const offset = -currentSlide * containerWidth;
      row.style.transform = `translateX(${offset}px)`;

      startAutoSlide(); // start auto sliding in mobile
    } else {
      // Reset styles for desktop
      row.style.width = '';
      slides.forEach(slide => {
        slide.style.width = '';
      });
      row.style.transform = 'none';
      currentSlide = 0;

      stopAutoSlide(); // stop auto sliding in desktop
    }
  }

  window.moveCarousel = function(direction) {
    if (window.innerWidth >= 768) return; // desktop mode: do nothing
    
    currentSlide += direction;

    // Boundary checks
    if (currentSlide < 0) {
      currentSlide = 0;
      return;
    }
    if (currentSlide >= totalSlides) {
      currentSlide = totalSlides - 1;
      return;
    }

    const containerWidth = row.parentElement.clientWidth;
    const offset = -currentSlide * containerWidth;
    row.style.transform = `translateX(${offset}px)`;
    
    // Smooth transition
    row.style.transition = 'transform 0.3s ease';
    setTimeout(() => {
      row.style.transition = '';
    }, 300);

    resetAutoSlide(); // reset timer when user clicks button
  };

  // Auto-slide functions
  function startAutoSlide() {
    stopAutoSlide(); // prevent multiple timers
    autoSlideInterval = setInterval(() => {
      if (window.innerWidth < 768) {
        if (currentSlide < totalSlides - 1) {
          window.moveCarousel(1);
        } else {
          currentSlide = -1; // reset so next interval moves to 0
          window.moveCarousel(1);
        }
      }
    }, 4000); // every 4 seconds
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // Initialize
  updateCarousel();

  // Debounced resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel();
    }, 100);
  });
});
