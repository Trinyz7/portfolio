document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('sideNav');
    const toggle = nav.querySelector('.menu-toggle');
    const links = [...nav.querySelectorAll('.nav-link')];

    // Menu mobile
    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
    });
    links.forEach(link => link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }));

    // Lien actif selon la section visible
    const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));

    // Barre de progression du scroll
    const bar = document.querySelector('.scroll-progress');
    const onScroll = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Halo lumineux qui suit la souris sur les cartes
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('pointermove', e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    if (window.AOS) {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
    }
});
