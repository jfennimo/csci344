
const modalElement = document.querySelector('.modal-bg');

const openModal = ev => {
    modalElement.classList.remove('hidden');
    modalElement.setAttribute('aria-hidden', 'false');
    document.querySelector('.close').focus();
}

const closeModal = ev => {
    modalElement.classList.add('hidden');
    modalElement.setAttribute('aria-hidden', 'false');
    document.querySelector('.open').focus();
};
