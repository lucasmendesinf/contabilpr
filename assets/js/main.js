const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('is-open');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    });
  });
}

const carousel = document.querySelector('[data-carousel]');
const track = document.querySelector('[data-carousel-track]');
const previous = document.querySelector('[data-carousel-prev]');
const next = document.querySelector('[data-carousel-next]');

if (carousel && track && previous && next) {
  const originalCards = Array.from(track.children);
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.tabIndex = -1;
    track.appendChild(clone);
  });

  const updateShift = () => {
    const halfWidth = track.scrollWidth / 2;
    track.style.setProperty('--carousel-shift', `-${halfWidth}px`);
  };

  const moveCarousel = (direction) => {
    const card = track.querySelector('.shortcut-card');
    const distance = card ? card.offsetWidth + 20 : 232;
    track.style.animationPlayState = 'paused';
    carousel.scrollBy({ left: direction * distance, behavior: 'smooth' });
    window.setTimeout(() => {
      track.style.animationPlayState = '';
    }, 900);
  };

  updateShift();
  window.addEventListener('resize', updateShift);
  previous.addEventListener('click', () => moveCarousel(-1));
  next.addEventListener('click', () => moveCarousel(1));
}

const form = document.querySelector('#contactForm');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(data.get('assunto') || 'Contato pelo site');
    const body = encodeURIComponent(
      `Nome: ${data.get('nome')}\nE-mail: ${data.get('email')}\nTelefone: ${data.get('telefone') || '-'}\n\n${data.get('mensagem')}`
    );
    window.location.href = `mailto:contabil@contabilpr.com.br?subject=${subject}&body=${body}`;
  });
}

const cookieBanner = document.querySelector('#cookieBanner');
const cookieAccept = document.querySelector('[data-cookie-accept]');
const cookieClose = document.querySelector('[data-cookie-close]');
const cookieStorageKey = 'contabilpr_cookie_terms_v1';

if (cookieBanner && cookieAccept && cookieClose) {
  const hasDecision = localStorage.getItem(cookieStorageKey);

  if (!hasDecision) {
    cookieBanner.hidden = false;
  }

  cookieAccept.addEventListener('click', () => {
    localStorage.setItem(cookieStorageKey, 'accepted');
    cookieBanner.hidden = true;
  });

  cookieClose.addEventListener('click', () => {
    localStorage.setItem(cookieStorageKey, 'closed');
    cookieBanner.hidden = true;
  });
}

const termsModal = document.querySelector('#termsModal');
const termsOpen = document.querySelectorAll('[data-terms-open]');
const termsClose = document.querySelectorAll('[data-terms-close]');

if (termsModal && termsOpen.length && termsClose.length) {
  const openTerms = (event) => {
    event.preventDefault();
    termsModal.hidden = false;
    const closeButton = termsModal.querySelector('[data-terms-close]');
    if (closeButton) {
      closeButton.focus();
    }
  };

  const closeTerms = () => {
    termsModal.hidden = true;
  };

  termsOpen.forEach((trigger) => {
    trigger.addEventListener('click', openTerms);
  });

  termsClose.forEach((trigger) => {
    trigger.addEventListener('click', closeTerms);
  });

  termsModal.addEventListener('click', (event) => {
    if (event.target === termsModal) {
      closeTerms();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !termsModal.hidden) {
      closeTerms();
    }
  });
}
