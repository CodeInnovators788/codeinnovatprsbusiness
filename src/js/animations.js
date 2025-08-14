document.addEventListener('DOMContentLoaded', () => {
  // Section reveal animation
  const sections = document.querySelectorAll('section');
  sections.forEach((sec) => {
    sec.style.opacity = 0;
    sec.style.transform = 'translateY(40px)';
    sec.style.transition = 'opacity 0.7s, transform 0.7s';
  });

  // Services card reveal animation (staggered)
  const serviceCards = document.querySelectorAll('.service.glass-card');
  serviceCards.forEach((card) => {
    card.classList.remove('visible');
  });

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.9;

    // Reveal sections
    sections.forEach((sec) => {
      const secTop = sec.getBoundingClientRect().top;
      if (secTop < triggerBottom) {
        sec.style.opacity = 1;
        sec.style.transform = 'none';
      }
    });

    // Reveal service cards with stagger
    serviceCards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        setTimeout(() => card.classList.add('visible'), i * 180);
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Carousel logic
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let current = 0;
  let carouselInterval;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      dots[i].classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function startCarousel() {
    carouselInterval = setInterval(nextSlide, 4000);
  }

  function stopCarousel() {
    clearInterval(carouselInterval);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      stopCarousel();
      startCarousel();
    });
  });

  showSlide(0);
  startCarousel();
});
