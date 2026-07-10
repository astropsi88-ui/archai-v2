const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const phrases = {
  companion: 'Хочу создать AI-компаньона, который будет рядом для жизни, дел и общей истории.',
  partner: 'Хочу создать личного ИИ-напарника для рабочих задач, проектов и процессов.',
  coauthor: 'Хочу создать цифрового соавтора для текстов, сценариев и регулярного контента.',
  project: 'Хочу создать цифровую личность проекта для Telegram и сайта.',
  start: 'Не знаю, с чего начать. Помогите выбрать подходящую цифровую личность.',
};

function typeLoop(el, text) {
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (el) el.textContent = text;
    return;
  }

  let index = 0;
  let direction = 'forward';
  let pauseUntil = 0;
  const forwardDelay = 75;
  const backwardDelay = 38;
  const fullTextPause = 1050;
  const emptyPause = 360;

  function tick() {
    const now = Date.now();

    if (pauseUntil > now) {
      setTimeout(tick, Math.min(pauseUntil - now, 120));
      return;
    }

    el.textContent = text.slice(0, index);

    if (direction === 'forward') {
      if (index < text.length) {
        index += 1;
        setTimeout(tick, forwardDelay);
      } else {
        direction = 'backward';
        pauseUntil = now + fullTextPause;
        setTimeout(tick, fullTextPause);
      }
      return;
    }

    if (index > 0) {
      index -= 1;
      setTimeout(tick, backwardDelay);
    } else {
      direction = 'forward';
      pauseUntil = now + emptyPause;
      setTimeout(tick, emptyPause);
    }
  }

  tick();
}

typeLoop($('.typing'), 'Напишите Вику своими словами, кого вы хотите создать…');

$$('.tag').forEach((button) =>
  button.addEventListener('click', () => {
    const text = phrases[button.dataset.prompt] || button.textContent.trim();
    const input = $('#chat-input');

    if (input) {
      input.value = text;
      input.focus();
    }
  }),
);

const toggle = $('.nav-toggle');
const nav = $('#site-nav');
const desktopQuery = matchMedia('(min-width: 961px)');

function closeNav({ returnFocus = false } = {}) {
  if (!toggle || !nav) return;

  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Открыть меню');
  nav.classList.remove('is-open');
  document.body.classList.remove('nav-open');

  if (returnFocus) toggle.focus();
}

function openNav() {
  if (!toggle || !nav) return;

  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Закрыть меню');
  nav.classList.add('is-open');
  document.body.classList.add('nav-open');
  nav.querySelector('a')?.focus();
}

if (toggle && nav) {
  toggle.addEventListener('click', () =>
    toggle.getAttribute('aria-expanded') === 'true' ? closeNav() : openNav(),
  );

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav({ returnFocus: true });
  });

  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) closeNav();
  });
}

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      }),
    { threshold: 0.18 },
  );

  $$('.reveal,.card,.node,.price-card,.network-node,.media-block').forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min((index % 7) * 70, 420)}ms`;
    io.observe(el);
  });
} else {
  $$('.reveal,.card,.node,.price-card,.network-node,.media-block').forEach((el) =>
    el.classList.add('revealed'),
  );
}

$$('.card,.price-card').forEach((el) =>
  el.addEventListener('pointermove', (event) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${event.clientX - rect.left}px`);
    el.style.setProperty('--y', `${event.clientY - rect.top}px`);
  }),
);
