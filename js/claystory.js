// Modal Logic
function openPiece(title, desc, price) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-price').innerText = price;
    document.getElementById('modal-contact').href =
        `mailto:marinaxu99@gmail.com?subject=Acquisition Inquiry: ${title}`;
    document.getElementById('piece-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('piece-modal').style.display = 'none';
}

// Close modal if user clicks outside content
window.onclick = function (event) {
    const modal = document.getElementById('piece-modal');
    if (event.target == modal) {
        closeModal();
    }
}