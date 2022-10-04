const refs = {
  openModalBtn: document.querySelector('.footer__link'),
  closeModalBtn: document.querySelector('.students-button__close'),
  modal: document.querySelector('.backdrop'),
};

refs.openModalBtn.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);

function openModal() {
  refs.modal.classList.remove('is-hidden');
}
function closeModal() {
  refs.modal.classList.add('is-hidden');
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
  console.log(e);
});
