// PRELOADER ANİMASYONU
window.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');
  const hexagon = document.querySelector('.hexagon');
  const kLogo = document.getElementById('preloader-k');

  // K harfini başta görünmez yap
  kLogo.style.opacity = 0;

  // SVG hexagon çizim animasyonu 1s sürüyor (drawHex keyframes)
  // Hexagon çizildikten sonra K yavaşça belirsin
  setTimeout(() => {
    kLogo.style.transition = 'opacity 0.6s cubic-bezier(.54,1.85,.31,.96)';
    kLogo.style.opacity = 1;
  }, 1000);

  // Toplamda 1.7s beklet (1s hexagon + 0.7s K bekleme), sonra preloader kapanır
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
      mainContent.style.display = 'flex';
      // Sayfa açıldığında ilk reveal'leri tetikle
      revealOnScroll();
    }, 400);
  }, 1700);
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// SPOTLIGHT EFEKTİ
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.body.style.setProperty('--x', `${x}%`);
  document.body.style.setProperty('--y', `${y}%`);
});
document.addEventListener('mouseleave', () => {
  document.body.style.setProperty('--x', `50vw`);
  document.body.style.setProperty('--y', `50vh`);
});

// NAV-LINK ACTIVE SECTION VURGUSU
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});
window.addEventListener('DOMContentLoaded', () => {
  navLinks[0].classList.add('active');
});

// REVEAL-ON-SCROLL ANİMASYONU
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  reveals.forEach((el, idx) => {
    const elementTop = el.getBoundingClientRect().top;
    // Reveal trigger point
    if (elementTop < windowHeight - 90) {
      // Reveal delay kademeli (Brittany stili) için:
      el.style.transition = `opacity 0.7s cubic-bezier(.54,1.85,.31,.96) ${(idx * 0.13).toFixed(2)}s, transform 0.8s cubic-bezier(.54,1.85,.31,.96) ${(idx * 0.13).toFixed(2)}s`;
      el.classList.add('revealed');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('resize', revealOnScroll);

// GITHUB PROJELERİNİ ÇEKME (Opsiyonel, yukarıdan kopyalandı)
fetch('https://api.github.com/users/keremgavcarr/repos')
  .then(res => res.json())
  .then(repos => {
    const container = document.getElementById('repo-list');
    if (!container) return;
    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    repos.forEach(repo => {
      const div = document.createElement('div');
      div.className = 'project-item';
      div.innerHTML = `
        <h3>${repo.name}</h3>
        ${repo.description ? `<p>${repo.description}</p>` : ''}
        <a href="${repo.html_url}" target="_blank">View on GitHub →</a>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error('GitHub repos cannot be fetched:', err);
  });

// Blender kart lightbox
document.querySelectorAll('.blender-card img').forEach(img => {
  img.addEventListener('click', function () {
    const lightbox = document.getElementById('img-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = this.src;
    lightbox.style.display = 'flex';
  });
});
document.getElementById('img-lightbox').addEventListener('click', function (e) {
  if (e.target === this) this.style.display = 'none';
});
const showMoreBtn = document.getElementById('showMoreBtn');
const blenderCards = document.querySelectorAll('.blender-card');
const DEFAULT_VISIBLE = 8;
function updateCards(showAll) {
  blenderCards.forEach((card, idx) => {
    if (showAll) {
      card.classList.remove('hidden');
    } else {
      if (idx < DEFAULT_VISIBLE) card.classList.remove('hidden');
      else card.classList.add('hidden');
    }
  });
}
let isShowingMore = false;
showMoreBtn.addEventListener('click', function () {
  isShowingMore = !isShowingMore;
  updateCards(isShowingMore);
  showMoreBtn.textContent = isShowingMore ? 'Show Less' : 'Show More';
});
updateCards(false);
