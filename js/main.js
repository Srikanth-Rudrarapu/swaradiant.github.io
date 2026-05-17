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
        // use header offset-aware scroll to avoid leaving a sliver of the previous section
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const extraOffset = 12; // small breathing room
        const top = targetSection.getBoundingClientRect().top + window.scrollY - (headerHeight + extraOffset);
        window.scrollTo({ top, behavior: 'smooth' });
        history.pushState(null, '', targetId);
      }
    });
  });

  if (sections.length && navLinks.length) {
    // compute header-aware rootMargin so the observed intersection aligns with visible area
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    const topMargin = headerHeight + 12; // add small gap

    // set scroll-margin-top on sections so native anchor scrolling respects header
    sections.forEach((section) => {
      section.style.scrollMarginTop = `${topMargin}px`;
    });

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
        // top margin accounts for sticky header so the section is considered 'in view' when below header
        rootMargin: `-${topMargin}px 0px -40% 0px`,
        threshold: 0.25,
      }
    );

    sections.forEach((section) => observer.observe(section));

    // update margins on resize since header height can change (compact state)
    window.addEventListener('resize', () => {
      const h = header ? header.offsetHeight : 0;
      const tm = h + 12;
      sections.forEach((section) => {
        section.style.scrollMarginTop = `${tm}px`;
      });
    });
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