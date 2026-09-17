document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('spotlight-track');
    if (!track) return;
    const panels = [...track.querySelectorAll('.spotlight-panel')];
    const dashes = [...document.querySelectorAll('.dash-item')];
    const prev = document.getElementById('spotlight-prev');
    const next = document.getElementById('spotlight-next');
    const counter = document.getElementById('spotlight-counter');
    if (!panels.length) return;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let active = 0;
    const position = panel => panel.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    function update() {
        active = panels.reduce((best, panel, i) =>
            Math.abs(position(panel) - track.scrollLeft) < Math.abs(position(panels[best]) - track.scrollLeft) ? i : best, 0);
        if (counter) counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`;
        dashes.forEach((dash, i) => {
            dash.classList.toggle('active', i === active);
            dash.setAttribute('aria-current', i === active ? 'true' : 'false');
        });
        if (prev) prev.disabled = active === 0;
        if (next) next.disabled = active === panels.length - 1;
    }
    function go(index, instant = false) {
        const target = panels[Math.max(0, Math.min(panels.length - 1, index))];
        track.scrollTo({left: position(target), behavior: instant || reducedMotion.matches ? 'instant' : 'smooth'});
    }
    function resize() {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        track.style.setProperty('--spotlight-tail', `${Math.max(0, track.clientWidth - panels.at(-1).getBoundingClientRect().width - gap)}px`);
        go(active, true);
        update();
    }
    prev?.addEventListener('click', () => go(active - 1));
    next?.addEventListener('click', () => go(active + 1));
    dashes.forEach((dash, i) => dash.addEventListener('click', () => go(i)));
    track.addEventListener('scroll', update, {passive: true});
    track.addEventListener('keydown', event => {
        if (event.target !== track) return;
        const targets = {ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: panels.length - 1};
        if (event.key in targets) { event.preventDefault(); go(targets[event.key]); }
    });
    new ResizeObserver(resize).observe(track);
    update();
});
