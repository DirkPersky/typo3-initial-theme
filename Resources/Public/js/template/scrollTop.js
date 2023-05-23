
window.addEventListener('DOMContentLoaded', () => {
    const toTopBtn = document.querySelector('#to-top');
    if(!toTopBtn) return;
    toTopBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
        // this changes the scrolling behavior to "smooth"
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return false;
    });
});

