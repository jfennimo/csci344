
const modalElement = document.querySelector('.modal-bg');

const openModal = () => {
    // shows the modal:
    modalElement.classList.remove('hidden');

    // accessibility:
    modalElement.setAttribute('aria-hidden', 'false');

    // puts the focus on the "close" button:
    document.querySelector('.close').focus();
}

const closeModal = () => {
    // hides the modal:
    modalElement.classList.add('hidden');

    // accessibility:
    modalElement.setAttribute('aria-hidden', 'false');

    // puts the focus on the "open" button:
    document.querySelector('.open').focus();
};


