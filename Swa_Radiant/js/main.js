(() => {
  // Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      navLinks.forEach((item) => item.classList.remove('active'));
      event.currentTarget.classList.add('active');
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
      }

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', targetId);
      }
    });
  });

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeId = entry.target.id;
            navLinks.forEach((link) => {
              const linkHash = link.getAttribute('href');
              link.classList.toggle('active', linkHash === `#${activeId}`);
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0.2,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Header compact state on scroll
  const header = document.querySelector('.header');
  const compactThreshold = 40;

  const updateHeaderState = () => {
    if (!header) return;
    if (window.scrollY > compactThreshold) {
      header.classList.add('header--compact');
    } else {
      header.classList.remove('header--compact');
    }
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  // Functional Privacy & Compliance Modal Logic
  const openBtn = document.getElementById('open-privacy');
  const closeBtn = document.getElementById('close-privacy');
  const modal = document.getElementById('privacy-modal');

  if (openBtn && closeBtn && modal) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
})();