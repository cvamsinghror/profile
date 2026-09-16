/* =========================================================
   SCRIPT.JS
   Five small features. Each one is separated below.
   ========================================================= */

/* ---------- 1. Mobile menu open / close ---------- */
const burgerBtn = document.getElementById('burgerBtn');
const navLinks  = document.getElementById('navLinks');

burgerBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  burgerBtn.setAttribute('aria-expanded', open);
  burgerBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

// Close the menu after tapping a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
  });
});


/* ---------- 2. Light / dark mode ---------- */
const themeBtn  = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');

// Work out which mode we are in right now
function currentTheme() {
  const set = document.documentElement.getAttribute('data-theme');
  if (set) return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

themeIcon.textContent = currentTheme() === 'dark' ? '☀' : '☾';

themeBtn.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', next);
  themeIcon.textContent = next === 'dark' ? '☀' : '☾';
  themeBtn.setAttribute('aria-label',
    next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
});


/* ---------- 3. Skill bars fill when scrolled into view ---------- */
const bars = document.querySelectorAll('.bar');

const barWatcher = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.dataset.level;          // reads data-level="85"
      entry.target.querySelector('i').style.width = level + '%';
      barWatcher.unobserve(entry.target);                // run only once
    }
  });
}, { threshold: 0.4 });

bars.forEach(bar => barWatcher.observe(bar));


/* ---------- 4. Highlight the nav link of the section you are reading ---------- */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav__link');

const sectionWatcher = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        const match = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('is-active', match);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => sectionWatcher.observe(section));


/* ---------- 5. Contact form checking ---------- */
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (event) => {
  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const message = document.getElementById('message');

  // clear old errors
  [name, email, message].forEach(input =>
    input.parentElement.classList.remove('has-error'));

  let problem = '';

  if (name.value.trim() === '') {
    name.parentElement.classList.add('has-error');
    problem = 'Enter your name.';
  } else if (!email.value.includes('@') || !email.value.includes('.')) {
    email.parentElement.classList.add('has-error');
    problem = 'Enter a valid email address.';
  } else if (message.value.trim().length < 10) {
    message.parentElement.classList.add('has-error');
    problem = 'Write at least 10 characters in the message.';
  }

  if (problem) {
    event.preventDefault();          // stop the send ONLY when something is wrong
    note.textContent = problem;
    note.className = 'form__note is-error';
  }
});

  // Everything is fine.
  // NOTE: a plain website cannot send email by itself.
  // Easiest free option: make a form at https://formspree.io and put its
  // address in the <form action="..." method="POST"> tag, then delete this block.
  note.textContent = 'Thanks ' + name.value.trim() + ', your message is ready to send.';
  note.className = 'form__note is-ok';
  form.reset();
;


/* ---------- 6. Hide the photo box border if image is missing ---------- */
const profileImg = document.getElementById('profileImg');
profileImg.addEventListener('error', () => { profileImg.style.display = 'none'; });


/* ---------- 7. Year in the footer, updates automatically ---------- */
document.getElementById('year').textContent = new Date().getFullYear();