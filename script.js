/* ── CUSTOM CURSOR (fine pointer only) ── */
if (window.matchMedia('(pointer:fine)').matches) {
    const C = document.getElementById('cursor'), R = document.getElementById('cursorRing');
    document.addEventListener('mousemove', e => {
        C.style.left = e.clientX + 'px';
        C.style.top = e.clientY + 'px';
        setTimeout(() => {
            R.style.left = e.clientX + 'px';
            R.style.top = e.clientY + 'px';
        }, 60);
    });
    document.querySelectorAll('a,button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            C.style.transform = 'translate(-50%,-50%) scale(2)';
            C.style.background = 'var(--dusty-grape)';
            R.style.transform = 'translate(-50%,-50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            C.style.transform = 'translate(-50%,-50%) scale(1)';
            C.style.background = 'var(--lemon-lime)';
            R.style.transform = 'translate(-50%,-50%) scale(1)';
        });
    });
}

/* ── NAV SCROLL ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50), {passive: true});

/* ── HAMBURGER ── */
const hbBtn = document.getElementById('hbBtn');
const drawer = document.getElementById('navDrawer');
let open = false;

function setDrawer(v) {
    open = v;
    hbBtn.classList.toggle('open', v);
    drawer.classList.toggle('open', v);
    hbBtn.setAttribute('aria-expanded', v);
    drawer.setAttribute('aria-hidden', !v);
    document.body.style.overflow = v ? 'hidden' : '';
}

hbBtn.addEventListener('click', () => setDrawer(!open));
document.querySelectorAll('.dl').forEach(l => l.addEventListener('click', () => setDrawer(false)));
document.addEventListener('click', e => {
    if (open && !drawer.contains(e.target) && !hbBtn.contains(e.target)) setDrawer(false);
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && open) setDrawer(false);
});

/* ── SCROLL REVEAL ── */
if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, {threshold: .1, rootMargin: '0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
} else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

/* ── TODAY'S HOURS ── */
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = DAYS[new Date().getDay()];
document.querySelectorAll('.hr').forEach(row => {
    if (row.querySelector('.dn')?.textContent.trim() === today) row.classList.add('today');
});

/* ── PIÑATA STYLE TAGS ── */
document.querySelectorAll('.pst').forEach(tag => {
    tag.addEventListener('click', () => {
        document.querySelectorAll('.pst').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
    });
});

/* ── SMOOTH ANCHOR WITH NAV OFFSET ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) {
            e.preventDefault();
            const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
            window.scrollTo({top: t.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth'});
        }
    });
});

// Auto-update copyright year
document.getElementById('year').textContent = new Date().getFullYear();