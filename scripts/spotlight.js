document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('spotlight-track');
    const panels = document.querySelectorAll('.spotlight-panel');
    const prevBtn = document.getElementById('spotlight-prev');
    const nextBtn = document.getElementById('spotlight-next');
    const counter = document.getElementById('spotlight-counter');
    const dashes = document.querySelectorAll('.dash-item');

    if (!track || panels.length === 0) return;

    const getPanelStep = () => {
        const gap = parseFloat(getComputedStyle(track).gap) || 40;
        return panels[0].offsetWidth + gap;
    };

    const updateActiveIndicator = () => {
        const scrollLeft = track.scrollLeft;
        const step = getPanelStep();
        const activeIndex = Math.min(
            panels.length - 1,
            Math.max(0, Math.round(scrollLeft / step))
        );

        if (counter) {
            counter.textContent = `0${activeIndex + 1} / 0${panels.length}`;
        }

        dashes.forEach((dash, i) => {
            dash.classList.toggle('active', i === activeIndex);
        });
    };

    track.addEventListener('scroll', updateActiveIndicator, { passive: true });

    const scrollToPanel = (index) => {
        const targetPanel = panels[index];
        if (targetPanel) {
            track.scrollTo({
                left: targetPanel.offsetLeft - track.offsetLeft,
                behavior: 'smooth'
            });
        }
    };

    nextBtn?.addEventListener('click', () => {
        const step = getPanelStep();
        const current = Math.round(track.scrollLeft / step);
        scrollToPanel(Math.min(panels.length - 1, current + 1));
    });

    prevBtn?.addEventListener('click', () => {
        const step = getPanelStep();
        const current = Math.round(track.scrollLeft / step);
        scrollToPanel(Math.max(0, current - 1));
    });

    dashes.forEach((dash, i) => {
        dash.addEventListener('click', () => scrollToPanel(i));
    });
});