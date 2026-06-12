const body = document.body;
const preloader = document.getElementById('preloader');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.site-nav a');
const revealItems = document.querySelectorAll('.reveal');
const showMoreBtn = document.getElementById('showMoreBtn');
const hiddenCards = document.querySelectorAll('.hidden-card');
const galleryImages = document.querySelectorAll('.gallery-card img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const sections = document.querySelectorAll('main section[id]');

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    preloader.classList.add('hidden');
    body.classList.remove('is-loading');
  }, 950);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener('mousemove', (event) => {
  const x = `${(event.clientX / window.innerWidth) * 100}%`;
  const y = `${(event.clientY / window.innerHeight) * 100}%`;
  document.documentElement.style.setProperty('--mouse-x', x);
  document.documentElement.style.setProperty('--mouse-y', y);
});

navToggle?.addEventListener('click', () => {
  body.classList.toggle('menu-open');
  navToggle.setAttribute('aria-expanded', String(body.classList.contains('menu-open')));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const setActiveNav = () => {
  let currentId = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 130;
    if (window.scrollY >= top) currentId = section.id;
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', target === currentId);
  });
};

window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

let galleryExpanded = false;
showMoreBtn?.addEventListener('click', () => {
  galleryExpanded = !galleryExpanded;
  hiddenCards.forEach((card) => card.classList.toggle('is-visible-card', galleryExpanded));
  showMoreBtn.textContent = galleryExpanded ? 'Show Less' : 'Show More';
});

galleryImages.forEach((image) => {
  image.addEventListener('click', () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
  });
});

const closeLightbox = () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  body.style.overflow = body.classList.contains('menu-open') || body.classList.contains('is-loading') ? 'hidden' : '';
};

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (lightbox.classList.contains('open')) closeLightbox();
    if (body.classList.contains('menu-open')) {
      body.classList.remove('menu-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  }
});


// Akira gameplay screenshot slider
const akiraSlider = document.querySelector('[data-slider]');
if (akiraSlider) {
  const slides = Array.from(akiraSlider.querySelectorAll('.akira-slide'));
  const dots = Array.from(akiraSlider.querySelectorAll('.slider-dot'));
  const prevButton = akiraSlider.querySelector('.slider-prev');
  const nextButton = akiraSlider.querySelector('.slider-next');
  const label = akiraSlider.querySelector('[data-slide-label]');
  const labels = ['Boss Encounter', 'Main Menu', 'Objective Flow', 'Combat Encounter'];
  let currentSlide = 0;
  let sliderTimer;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === currentSlide);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === currentSlide);
    });
    if (label) label.textContent = labels[currentSlide] || `Screenshot ${currentSlide + 1}`;
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  const restartSlider = () => {
    window.clearInterval(sliderTimer);
    sliderTimer = window.setInterval(nextSlide, 4200);
  };

  nextButton?.addEventListener('click', () => {
    nextSlide();
    restartSlider();
  });

  prevButton?.addEventListener('click', () => {
    prevSlide();
    restartSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      restartSlider();
    });
  });

  akiraSlider.addEventListener('mouseenter', () => window.clearInterval(sliderTimer));
  akiraSlider.addEventListener('mouseleave', restartSlider);

  showSlide(0);
  restartSlider();
}
