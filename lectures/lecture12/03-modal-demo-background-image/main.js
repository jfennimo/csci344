
const modalElement = document.querySelector('.modal-bg');

const openModal = ev => {
    console.log('open!');
    modalElement.classList.remove('hidden');
    modalElement.setAttribute('aria-hidden', 'false');
    document.querySelector('.close').focus();
}

const closeModal = ev => {
    console.log('close!');
    modalElement.classList.add('hidden');
    modalElement.setAttribute('aria-hidden', 'false');
    document.querySelector('.open').focus();
};


// function ensures that if the tabbing gets to the end of the 
// modal, it will loop back up to the beginning of the modal:
document.addEventListener('focus', function(event) {
    console.log('focus');
    if (modalElement.getAttribute('aria-hidden') === 'false' && !modalElement.contains(event.target)) {
        console.log('back to top!');
        event.stopPropagation();
        document.querySelector('.close').focus();
    }
}, true);

