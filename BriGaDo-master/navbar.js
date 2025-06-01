document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const authButtons = document.getElementById('auth-buttons');
    
    // Toggle main menu
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      authButtons.classList.toggle('active');
    });
    
    // Handle services dropdown on mobile
    const servicesMenu = document.querySelector('.services-menu');
    if (servicesMenu) {
      servicesMenu.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const dropdown = this.querySelector('.dropdown');
          dropdown.classList.toggle('active');
        }
      });
    }
  });