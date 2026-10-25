'use strict';

document.getElementById('year').textContent = new Date().getFullYear();

const contactModal = document.getElementById('contact-modal');
document.querySelectorAll('[data-contact-open]').forEach(button => {
  button.addEventListener('click', () => contactModal.showModal());
});
contactModal.querySelector('.modal-close').addEventListener('click', () => contactModal.close());
