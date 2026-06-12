const cursor = document.querySelector('.cursor');
const textElement = document.getElementById('typewriter-text');
const nodes = document.querySelectorAll('.node');

// Custom Cursor Follow
document.addEventListener('mousemove', (e) => {
    // Keep cursor centered on mouse
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

nodes.forEach(node => {
    node.addEventListener('mouseover', () => {
        // Visual cue: Grow cursor into a "lens"
        cursor.style.border = '1px solid #fff';

        // Typing effect trigger
        textElement.classList.remove('typing');
        void textElement.offsetWidth;
        textElement.innerText = node.getAttribute('data-text');
        textElement.classList.add('typing');
    });

    node.addEventListener('mouseout', () => {
        cursor.style.border = '1px solid rgba(255,255,255,0.5)';
        textElement.classList.remove('typing');
        textElement.innerText = "SELECT YOUR CREATIVE FREQUENCY.";
        textElement.style.opacity = "0.3";
    });

    node.addEventListener('click', () => {
        // Simple redirect
        window.location.href = node.classList.contains('node-arki') ? 'arki_main.html' : 'claystory.html';
    });
});