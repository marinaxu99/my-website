/* spotlight.js — Fast-Click Responsive Carousel & Viewpoint Focus Observer */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Selected Work Spotlight Track & Responsive Fast-Clicking
    // -------------------------------------------------------------
    const track = document.getElementById('spotlight-track');
    if (track) {
        const panels = [...track.querySelectorAll('.spotlight-panel')];
        const dashes = [...document.querySelectorAll('.dash-item')];
        const prev = document.getElementById('spotlight-prev');
        const next = document.getElementById('spotlight-next');
        const counter = document.getElementById('spotlight-counter');

        if (panels.length) {
            const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
            let currentIndex = 0;
            let targetIndex = 0;
            let isAnimating = false;
            let animationFrameId = null;

            const getPanelOffset = panel =>
                panel.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;

            function updateUI(activeIdx) {
                currentIndex = activeIdx;
                if (counter) {
                    counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`;
                }

                dashes.forEach((dash, i) => {
                    dash.classList.toggle('active', i === currentIndex);
                    dash.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
                });

                if (prev) prev.disabled = targetIndex <= 0;
                if (next) next.disabled = targetIndex >= panels.length - 1;
            }

            function smoothScrollTo(targetX, duration = 550) {
                if (reducedMotion.matches) {
                    track.scrollLeft = targetX;
                    updateUI(targetIndex);
                    return;
                }

                if (isAnimating) cancelAnimationFrame(animationFrameId);

                const startX = track.scrollLeft;
                const distance = targetX - startX;
                const startTime = performance.now();

                track.style.scrollSnapType = 'none';
                track.style.scrollBehavior = 'auto';
                isAnimating = true;

                const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

                function step(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeProgress = easeOutQuart(progress);

                    track.scrollLeft = startX + distance * easeProgress;

                    const currentOffset = track.scrollLeft;
                    const closest = panels.reduce((best, panel, i) =>
                        Math.abs(getPanelOffset(panel) - currentOffset) < Math.abs(getPanelOffset(panels[best]) - currentOffset) ? i : best, 0);

                    if (closest !== currentIndex) {
                        updateUI(closest);
                    }

                    if (progress < 1) {
                        animationFrameId = requestAnimationFrame(step);
                    } else {
                        track.scrollLeft = targetX;
                        track.style.scrollSnapType = 'x mandatory';
                        track.style.scrollBehavior = 'smooth';
                        isAnimating = false;
                        updateUI(targetIndex);
                    }
                }

                animationFrameId = requestAnimationFrame(step);
            }

            function goToIndex(idx) {
                targetIndex = Math.max(0, Math.min(panels.length - 1, idx));
                updateUI(targetIndex);
                smoothScrollTo(getPanelOffset(panels[targetIndex]), 500);
            }

            function resize() {
                const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
                const tail = Math.max(0, track.clientWidth - panels.at(-1).getBoundingClientRect().width - gap);
                track.style.setProperty('--spotlight-tail', `${tail}px`);
                track.scrollLeft = getPanelOffset(panels[targetIndex]);
                updateUI(targetIndex);
            }

            prev?.addEventListener('click', (e) => {
                e.preventDefault();
                if (targetIndex > 0) goToIndex(targetIndex - 1);
            });

            next?.addEventListener('click', (e) => {
                e.preventDefault();
                if (targetIndex < panels.length - 1) goToIndex(targetIndex + 1);
            });

            dashes.forEach((dash, i) => {
                dash.addEventListener('click', () => goToIndex(i));
            });

            track.addEventListener('scroll', () => {
                if (!isAnimating) {
                    const currentOffset = track.scrollLeft;
                    const closest = panels.reduce((best, panel, i) =>
                        Math.abs(getPanelOffset(panel) - currentOffset) < Math.abs(getPanelOffset(panels[best]) - currentOffset) ? i : best, 0);
                    targetIndex = closest;
                    updateUI(closest);
                }
            }, { passive: true });

            track.addEventListener('keydown', event => {
                if (event.target !== track) return;
                if (event.key === 'ArrowLeft' && targetIndex > 0) {
                    event.preventDefault();
                    goToIndex(targetIndex - 1);
                } else if (event.key === 'ArrowRight' && targetIndex < panels.length - 1) {
                    event.preventDefault();
                    goToIndex(targetIndex + 1);
                } else if (event.key === 'Home') {
                    event.preventDefault();
                    goToIndex(0);
                } else if (event.key === 'End') {
                    event.preventDefault();
                    goToIndex(panels.length - 1);
                }
            });

            // Check if returning from a specific project in Selected Work
            const urlParams = new URLSearchParams(window.location.search);
            const initProject = urlParams.get('project');
            const initialIndex = initProject !== null ? parseInt(initProject, 10) : 0;

            new ResizeObserver(resize).observe(track);
            goToIndex(initialIndex);
        }
    }

    // -------------------------------------------------------------
    // 2. Viewpoint Focus / Blur Transition (Dominant Center Section)
    // -------------------------------------------------------------
    const focusSections = document.querySelectorAll('.hero, .spotlight-section, .archive, .closing-stage');

    if (focusSections.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        function updateDominantSection() {
            // Viewport horizontal centerline (where the user's eye naturally rests)
            const viewportCenterY = window.innerHeight * 0.48;

            let closestSection = null;
            let closestDistance = Infinity;

            focusSections.forEach(sec => {
                const rect = sec.getBoundingClientRect();

                // If the section actually covers or is near the viewport center
                if (rect.top <= viewportCenterY && rect.bottom >= viewportCenterY) {
                    closestSection = sec;
                    closestDistance = 0;
                } else {
                    // Distance of the section's closest edge to center
                    const distToCenter = Math.min(
                        Math.abs(rect.top - viewportCenterY),
                        Math.abs(rect.bottom - viewportCenterY)
                    );
                    if (distToCenter < closestDistance) {
                        closestDistance = distToCenter;
                        closestSection = sec;
                    }
                }
            });

            focusSections.forEach(sec => {
                if (sec === closestSection) {
                    sec.classList.add('is-focused');
                } else {
                    sec.classList.remove('is-focused');
                }
            });
        }

        // Run immediately on page load and on scroll
        updateDominantSection();
        window.addEventListener('scroll', updateDominantSection, { passive: true });
        window.addEventListener('resize', updateDominantSection, { passive: true });
    }
});