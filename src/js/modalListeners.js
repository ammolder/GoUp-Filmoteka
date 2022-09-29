import { modal } from './modalRender';
import { getApiDetails } from './getFIlmDetails';

const cardList = document.querySelector('.card__list');
cardList.addEventListener('click', onClickCard);

export async function onClickCard(evt) {
  const cardId = evt.target.dataset.id;
  if (cardId) {
    const responseCardDetails = await getApiDetails(cardId);
    console.log(responseCardDetails.data);
    modal(responseCardDetails.data);

    const modalOverlay = document.querySelector('.backdrop');
    modalOverlay.addEventListener('click', onClickModal);
    document.addEventListener('keydown', keyDown);
  }
}

export function onClickModal(evt) {
  console.log(evt.target);
  const modalOverlay = document.querySelector('.backdrop');
  // modalOverlay.addEventListener('click', onClickModal);
  if (evt.target === modalOverlay) {
    modalOverlay.remove();
    document.removeEventListener('keydown', keyDown);
  }
}

export function onBtnCloseClick() {
  const modalBackdrop = document.querySelector('.backdrop');
  modalBackdrop.remove();
}

export function keyDown(evt) {
  const modalOverlay = document.querySelector('.backdrop');
  document.addEventListener('keydown', keyDown);
  if (evt.key === 'Escape') {
    modalOverlay.remove();
    document.removeEventListener('keydown', keyDown);
  }
}

export function onWatchedClick(evt) {
  button = evt.currentTarget;
  button.textContent = 'REMOVE FROM WATCHED';
  button.style.backgroundColor = 'red';
  button.style.outline = 'none';
  button.style.borderColor = 'transparent';
  button.style.color = 'var(--primary-text-color)';
}

export function onQueueClick(evt) {
  button = evt.currentTarget;
  button.textContent = 'REMOVE FROM QUEUE';
  button.style.backgroundColor = 'red';
  button.style.outline = 'none';
  button.style.borderColor = 'transparent';
  button.style.color = 'var(--primary-text-color)';
}
