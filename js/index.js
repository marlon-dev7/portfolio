// new kursor({
//   type: 1,
//   removeDefaultCursor: true,
//   color: '#000000'
// });

// Menu responsive toggle
const containerIcons = document.getElementById("container__icons");
const menuIcon = document.getElementById("menu__icon");
const closeIcon = document.getElementById("close__icon");
const navList = document.getElementById("nav__list");

const mostrar_ocultar_nav = () => {
  const menuIsOpen = navList.classList.toggle("nav__list--show");
  menuIcon.classList.toggle("icon--hide");
  closeIcon.classList.toggle("icon--show");

  if (menuIsOpen) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
}

containerIcons.addEventListener("click", mostrar_ocultar_nav);

// Close menu when clicking a nav link (mobile) - optional simple auto-close
navList.addEventListener('click', function (e) {
  const a = e.target.closest('a');
  if (!a) return;
  // close menu after clicking a link
  navList.classList.remove('nav__list--show');
  menuIcon.classList.remove('icon--hide');
  closeIcon.classList.remove('icon--show');
  document.body.classList.remove('no-scroll');
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// activar enlace de menú según la página actual (funciona en todas las páginas HTML)
(function markActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav__link');
  links.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path) {
      link.classList.add('active');
    }
  });
})();

// reproducir/pausar video al hacer hover sobre la sección
(function initHoverVideo() {
  try {
    // Buscar cualquier contenedor de proyecto que tenga un <video>
    const containers = Array.from(document.querySelectorAll('.cont-project'));
    if (!containers.length) return;

    // determinar si estamos en un dispositivo táctil/sin hover
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.matchMedia('(hover: none)').matches;

    containers.forEach(container => {
      const video = container.querySelector('video');
      if (!video) return; // solo interesan contenedores con video

      const playVideo = (ev) => {
        // ignorar toques como 'hover' en dispositivos táctiles
        if (ev && ev.pointerType === 'touch') return;
        video.play().catch(() => {});
      };

      const stopVideo = () => {
        try {
          video.pause();
        } catch (e) {}
      };

      // reproducir/pausar independiente por contenedor
      container.addEventListener('pointerenter', playVideo);
      container.addEventListener('pointerleave', (ev) => {
        if (ev.pointerType === 'touch') return; // no pausar cuando se arrastra el dedo para scroll
        stopVideo();
      });

      // accesibilidad: play/pause con focus/blur
      container.addEventListener('focus', playVideo, true);
      container.addEventListener('blur', stopVideo, true);

      // para móviles: tocar alterna reproducción (toggle)
      // container.addEventListener('touchstart', (e) => {
      //   try {
      //     if (video.paused) video.play();
      //     else { video.pause(); }
      //   } catch (err) {}
      // }, { passive: true });

      // si es dispositivo táctil, activar autoplay inmediato
      if (isTouch) {
        video.play().catch(() => {});
      }
    });
  } catch (err) {
    console.warn('initHoverVideo:', err);
  }
})();

// Inicializar pestañas (tabs) con accesibilidad básica
(function initTabs() {
  try {
    const tabContainers = document.querySelectorAll('.tabs');
    if (!tabContainers.length) return;

    tabContainers.forEach(container => {
      const buttons = container.querySelectorAll('.tab-btn');
      const panels = container.querySelectorAll('.tab-panel');
      const storageKey = 'tabs:' + (container.id || window.location.pathname);

      function save(index) {
        try { localStorage.setItem(storageKey, String(index)); } catch (e) { /* ignore */ }
      }

      function loadIndex() {
        try {
          const v = localStorage.getItem(storageKey);
          const n = v === null ? null : parseInt(v, 10);
          if (n === null || Number.isNaN(n) || n < 0 || n >= buttons.length) return null;
          return n;
        } catch (e) { return null; }
      }

      function activate(index) {
        buttons.forEach((b, i) => {
          const selected = i === index;
          b.classList.toggle('active', selected);
          b.setAttribute('aria-selected', selected ? 'true' : 'false');
        });
        panels.forEach((p, i) => {
          if (i === index) {
            p.classList.add('active');
            p.removeAttribute('hidden');
          } else {
            p.classList.remove('active');
            p.setAttribute('hidden', '');
          }
        });
        save(index);
      }

      // intentar cargar selección previa
      const initial = loadIndex();
      if (initial !== null) activate(initial);

      buttons.forEach((btn, idx) => {
        btn.addEventListener('click', () => activate(idx));
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const next = (idx + 1) % buttons.length;
            buttons[next].focus();
            activate(next);
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = (idx - 1 + buttons.length) % buttons.length;
            buttons[prev].focus();
            activate(prev);
          }
        });
      });
    });
  } catch (err) {
    console.warn('initTabs:', err);
  }
})();

// Pausar y reproducir video al hacer hover
const video = document.getElementById('p-video');

// Reproducir al hacer hover
video.onmouseover = function () {
  video.play();
};

// Pausar al quitar el mouse
video.onmouseout = function () {
  video.pause();
};
