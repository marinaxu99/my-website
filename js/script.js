document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const btnFilm = document.getElementById('btn-film');
    const btnNan = document.getElementById('btn-nan');
    const filmSection = document.getElementById('film-section');
    const nanSection = document.getElementById('nan-section');
    const dynamicGreeting = document.getElementById('dynamic-greeting');
    const introScreen = document.getElementById('intro-screen');

    // INTRO SCREEN CONTROLLERS 
    setTimeout(() => {
        if (introScreen) introScreen.classList.add('hide-intro');
    }, 5500);

    setTimeout(() => {
        if (introScreen) introScreen.style.display = 'none';
    }, 6500);

    // Context Vibe Switch Logic
    function switchVibe(vibe) {
        if (vibe === 'film') {
            body.className = 'theme-film';
            btnNan.classList.remove('active');
            btnFilm.classList.add('active');
            nanSection.classList.add('hidden');
            filmSection.classList.remove('hidden');
            dynamicGreeting.innerText = "I build the framework for good work.";
        } else if (vibe === 'nan') {
            body.className = 'theme-nan';
            btnFilm.classList.remove('active');
            btnNan.classList.add('active');
            filmSection.classList.add('hidden');
            nanSection.classList.remove('hidden');
            dynamicGreeting.innerText = "Objects designed for a slower pace.";
        }
    }

    btnFilm.addEventListener('click', () => switchVibe('film'));
    btnNan.addEventListener('click', () => switchVibe('nan'));
});