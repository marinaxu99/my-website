function openPiece(title, desc, price) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-price').innerText = price;
    document.getElementById('modal-contact').href = 'mailto:marinaxu99@gmail.com?subject=Acquisition: ' + title;
    document.getElementById('piece-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('piece-modal').style.display = 'none';
}