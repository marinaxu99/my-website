document.addEventListener("DOMContentLoaded", () => {
    // 1. THIS IS THE FIX: Tell the browser not to restore the scroll position on refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // 2. Initial State: Lock scroll and force top position
    document.body.classList.add('no-scroll');
    window.scrollTo(0, 0);

    const body = document.body;
    const btnFilm = document.getElementById('btn-film');
    const btnNan = document.getElementById('btn-nan');
    const filmSection = document.getElementById('film-section');
    const nanSection = document.getElementById('nan-section');
    const dynamicGreeting = document.getElementById('dynamic-greeting');
    const introScreen = document.getElementById('intro-screen');
    const skipBtn = document.getElementById('skip-intro');

    // 3. Define the exit function
    const exitIntro = () => {
        introScreen.classList.add('hide-intro');
        setTimeout(() => {
            introScreen.style.display = 'none';
            body.classList.remove('no-scroll');
            window.scrollTo(0, 0);
        }, 1000);
    };

    // 4. Trigger: Click "Enter Site"
    if (skipBtn) {
        skipBtn.addEventListener('click', exitIntro);
    }

    // 5. Trigger: Enable button interaction after fade-in
    setTimeout(() => {
        if (skipBtn) skipBtn.classList.add('is-active');
    }, 2000);

    // 6. Trigger: Automatic timing
    setTimeout(() => {
        if (introScreen.style.display !== 'none') {
            exitIntro();
        }
    }, 5500);

    // 7. Context Vibe Switch Logic
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

    btnFilm.addEventListener('click', () => switchVibe('film'));
    btnNan.addEventListener('click', () => switchVibe('nan'));
});