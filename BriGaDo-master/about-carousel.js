window.addEventListener('DOMContentLoaded', () => {
  const row = document.getElementById('carousel');
  const slides = Array.from(row.querySelectorAll('.image-about'));
  const totalSlides = slides.length;
  let currentSlide = 0;

  function updateCarousel() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Get the actual width of the carousel container (accounting for padding)
      const containerWidth = row.parentElement.clientWidth;
      
      row.style.width = `${totalSlides * containerWidth}px`;
      slides.forEach(slide => {
        slide.style.width = `${containerWidth}px`;
      });
      
      // Update position based on current slide
      const offset = -currentSlide * containerWidth;
      row.style.transform = `translateX(${offset}px)`;
    } else {
      // Reset styles for desktop
      row.style.width = '';
      slides.forEach(slide => {
        slide.style.width = '';
      });
      row.style.transform = 'none';
      currentSlide = 0;
    }
  }

  window.moveCarousel = function(direction) {
    if (window.innerWidth >= 768) return; // Don't do anything on desktop
    
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
    
    // Move to the new slide
    const containerWidth = row.parentElement.clientWidth;
    const offset = -currentSlide * containerWidth;
    row.style.transform = `translateX(${offset}px)`;
    
    // Smooth transition
    row.style.transition = 'transform 0.3s ease';
    setTimeout(() => {
      row.style.transition = '';
    }, 300);
  };

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