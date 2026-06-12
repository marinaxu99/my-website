document.addEventListener("DOMContentLoaded", () => {
    // 1. Tell the browser not to restore the scroll position on refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    const body = document.body;
    const introScreen = document.getElementById('intro-screen');

    // Check for return flag from Clay Story page
    const urlParams = new URLSearchParams(window.location.search);
    const isReturning = urlParams.get('returning');

    if (isReturning === 'true') {
        // Skip animation if returning from Clay Story
        if (introScreen) {
            introScreen.style.display = 'none';
        }
        window.scrollTo(0, 0);
    } else {
        // Run standard animation logic for first-time visit
        body.classList.add('no-scroll');
        window.scrollTo(0, 0);

        const skipBtn = document.getElementById('skip-intro');

        const exitIntro = () => {
            introScreen.classList.add('hide-intro');
            setTimeout(() => {
                introScreen.style.display = 'none';
                body.classList.remove('no-scroll');
                window.scrollTo(0, 0);
            }, 1000);
        };

        if (skipBtn) {
            skipBtn.addEventListener('click', exitIntro);
        }

        setTimeout(() => {
            if (skipBtn) skipBtn.classList.add('is-active');
        }, 2000);

        setTimeout(() => {
            if (introScreen && introScreen.style.display !== 'none') {
                exitIntro();
            }
        }, 5500);
    }

    // 7. Context Vibe Switch Logic (Existing)
    const btnFilm = document.getElementById('btn-film');
    const btnNan = document.getElementById('btn-nan');
    const filmSection = document.getElementById('film-section');
    const nanSection = document.getElementById('nan-section');
    const dynamicGreeting = document.getElementById('dynamic-greeting');

    function switchVibe(vibe) {
        if (vibe === 'film') {
            body.className = 'theme-film';
            btnNan.classList.remove('active');
            btnFilm.classList.add('active');
            nanSection.classList.add('hidden');
            filmSection.classList.remove('hidden');
            dynamicGreeting.innerText = "Embrace the chaos.";
        } else if (vibe === 'nan') {
            body.className = 'theme-nan';
            btnFilm.classList.remove('active');
            btnNan.classList.add('active');
            filmSection.classList.add('hidden');
            nanSection.classList.remove('hidden');
            dynamicGreeting.innerText = "Work with the silence.";
        }
    }

    if (btnFilm) btnFilm.addEventListener('click', () => switchVibe('film'));
    if (btnNan) btnNan.addEventListener('click', () => switchVibe('nan'));
});