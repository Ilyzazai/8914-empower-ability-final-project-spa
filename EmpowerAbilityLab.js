//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like
function knowledgeRunner() {

  const views = {
    home:     document.getElementById('view-home'),
    services: document.getElementById('view-services'),
    schedule: document.getElementById('view-schedule'),
  };

  const pageTitles = {
    home:     'Empower Ability Labs',
    services: 'Services - Empower Ability Labs',
    schedule: 'Schedule a call - Empower Ability Labs',
  };

  const navLinks    = document.querySelectorAll('[data-view]');
  const announcer   = document.getElementById('page-announcer');
  const mainContent = document.getElementById('main-content');
  const navToggler  = document.getElementById('nav-toggler');
  const navCollapse = document.getElementById('mainNav');

  function showView(viewName) {
    const target = views[viewName] ? viewName : 'home';

    Object.entries(views).forEach(([name, section]) => {
      section.toggleAttribute('hidden', name !== target);
    });

    navLinks.forEach(link => {
      const active = link.dataset.view === target;
      link.classList.toggle('active', active);
      active ? link.setAttribute('aria-current', 'page') : link.removeAttribute('aria-current');
    });

    document.title = pageTitles[target];
    announcer.textContent = '';
    requestAnimationFrame(() => { announcer.textContent = pageTitles[target] + ' — page loaded'; });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => mainContent.focus(), 150);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      history.pushState({ view: link.dataset.view }, '', '#' + link.dataset.view);
      showView(link.dataset.view);
      if (navCollapse.classList.contains('show')) {
        navCollapse.classList.remove('show');
        navToggler.setAttribute('aria-expanded', 'false');
      }
    });
  });

  window.addEventListener('popstate', e => showView(e.state?.view || 'home'));

  const hash = window.location.hash.replace('#', '');
  if (hash && views[hash]) showView(hash);


  navToggler.addEventListener('click', () => {
    const expanded = navToggler.getAttribute('aria-expanded') === 'true';
    navToggler.setAttribute('aria-expanded', String(!expanded));
    navCollapse.classList.toggle('show');
  });


  const modal   = document.getElementById('community-modal');
  const openBtn = document.getElementById('meet-community-btn');
  const closeX  = document.getElementById('modal-close-x');
  const closeBtn = document.getElementById('modal-close-btn');

  function openModal()  { modal.removeAttribute('hidden'); document.body.classList.add('modal-is-open'); closeX.focus(); }
  function closeModal() { modal.setAttribute('hidden', ''); document.body.classList.remove('modal-is-open'); openBtn.focus(); }

  openBtn.addEventListener('click', openModal);
  closeX.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  modal.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.stopPropagation(); closeModal(); return; }
    if (e.key === 'Tab') {
      const focusable = Array.from(modal.querySelectorAll('button:not([disabled]), a[href], input, textarea, [tabindex]:not([tabindex="-1"])'));
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });


  const emailToggle = document.getElementById('email-toggle');
  emailToggle.addEventListener('click', () => {
    emailToggle.setAttribute('aria-checked', String(emailToggle.getAttribute('aria-checked') !== 'true'));
  });
  emailToggle.addEventListener('keydown', e => { if (e.key === ' ') { e.preventDefault(); emailToggle.click(); } });


  const speakerCheckbox = document.getElementById('topic-speaker');
  const eventWrapper    = document.getElementById('event-description-wrapper');
  const eventTextarea   = document.getElementById('event-description');

  speakerCheckbox.addEventListener('change', () => {
    eventWrapper.toggleAttribute('hidden', !speakerCheckbox.checked);
    if (speakerCheckbox.checked) setTimeout(() => eventTextarea.focus(), 50);
  });


  const scheduleForm    = document.getElementById('schedule-form');
  const emailInput      = document.getElementById('email-address');
  const emailError      = document.getElementById('email-error');
  const formMessages    = document.getElementById('form-messages');
  const thankYouMessage = document.getElementById('thank-you-message');

  function setEmailInvalid(msg) {
    emailInput.classList.add('is-invalid');
    emailInput.setAttribute('aria-invalid', 'true');
    emailError.textContent = msg;
  }

  function clearEmailError() {
    emailInput.classList.remove('is-invalid');
    emailInput.removeAttribute('aria-invalid');
    emailError.textContent = '';
  }

  emailInput.addEventListener('input', () => { if (emailInput.validity.valid) clearEmailError(); });

  scheduleForm.addEventListener('submit', e => {
    e.preventDefault();
    clearEmailError();
    formMessages.innerHTML = '';

    const val = emailInput.value.trim();
    let msg = '';
    if (!val) msg = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) msg = 'Please enter a valid email address (e.g. name@example.com).';

    if (msg) {
      setEmailInvalid(msg);
      formMessages.innerHTML = `<div class="alert alert-danger" role="alert"><strong>Please correct the following error:</strong><ul class="mb-0 mt-1"><li><a href="#email-address">${msg}</a></li></ul></div>`;
      emailInput.focus();
      return;
    }

    scheduleForm.setAttribute('hidden', '');
    thankYouMessage.removeAttribute('hidden');
    thankYouMessage.focus();
  });

  // Space bar activation code 
  document.querySelectorAll('#view-home a[href]').forEach(link => {
  link.addEventListener('keydown', e => {
    if (e.key === ' ') {
      e.preventDefault(); // stops page from scrolling on Space
      link.click();       // triggers the link as if clicked
    }
  });
});

}

knowledgeRunner();
