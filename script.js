(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));

      projectCards.forEach((card) => {
        const categories = card.dataset.category.split(' ');
        const shouldShow = filter === 'all' || categories.includes(filter);
        card.classList.add('is-fading');
        window.setTimeout(() => {
          card.hidden = !shouldShow;
          card.classList.remove('is-fading');
        }, 120);
      });
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Make local file previews understandable without interfering with Netlify Forms.
  if (window.location.protocol === 'file:') {
    document.querySelectorAll('form[data-netlify="true"]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Preview mode: the form is ready for Netlify Forms. Deploy the folder to Netlify to collect submissions.');
      });
    });
  }
})();
