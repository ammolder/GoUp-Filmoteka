import { modal } from './modalRender';
import { getApiDetails } from './getFIlmDetails';

const cardList = document.querySelector('.card__list');

let responseCardDetails = null;
let watchedStorage = [];
let queueStorage = [];

const cardListLibrary = document.querySelector('.card__list-library');
if (cardList) {
  cardList.addEventListener('click', onClickCard);
}
if (cardListLibrary) {
  cardListLibrary.addEventListener('click', onClickCard);
}
export async function onClickCard(evt) {
  const cardId = evt.target.dataset.id;
  if (cardId) {
    responseCardDetails = await getApiDetails(cardId);
    // console.log(responseCardDetails.data);
    modal(responseCardDetails.data);

    const modalOverlay = document.querySelector('.backdrop');
    modalOverlay.addEventListener('click', onClickModal);
    document.addEventListener('keydown', keyDown);
  }
}

export function onClickModal(evt) {
  // console.dir(evt.target);
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

export const STORAGE_WATCHED_KEY = 'watched-films-lib';
export const STORAGE_QUEUE_KEY = 'queue-films-lib';

export function onWatchedClick(evt) {
  button = evt.currentTarget;
  button.textContent = 'REMOVE FROM WATCHED';
  button.classList.add('remove');
  let watchedParsed = JSON.parse(localStorage.getItem(STORAGE_WATCHED_KEY));
  console.log(watchedParsed);
  if (watchedParsed !== null) {
    for (let i = 0; i < watchedParsed.length; i += 1) {
      if (+responseCardDetails.data.id === +watchedParsed[i].id) {
        watchedStorage = JSON.parse(
          localStorage.getItem(STORAGE_WATCHED_KEY)
        ).find((film, index) => {
          if (+responseCardDetails.data.id === +film.id) {
            console.log(index);
            watchedStorage.splice(index, 1);
            localStorage.setItem(
              STORAGE_WATCHED_KEY,
              JSON.stringify(watchedStorage)
            );
          }
        });
        return;
      }
    }
  }

  if (localStorage.getItem(STORAGE_WATCHED_KEY)) {
    watchedStorage = JSON.parse(localStorage.getItem(STORAGE_WATCHED_KEY));
    watchedStorage.push(responseCardDetails.data);
    localStorage.setItem(STORAGE_WATCHED_KEY, JSON.stringify(watchedStorage));
    return;
  }
  watchedStorage.push(responseCardDetails.data);
  console.log(watchedStorage);
  localStorage.setItem(STORAGE_WATCHED_KEY, JSON.stringify(watchedStorage));
}

export function onQueueClick(evt) {
  button = evt.currentTarget;
  button.textContent = 'REMOVE FROM QUEUE';
  button.classList.add('remove');
  let queueParsed = JSON.parse(localStorage.getItem(STORAGE_QUEUE_KEY));
  if (queueParsed !== null) {
    for (let i = 0; i < queueParsed.length; i += 1) {
      if (+responseCardDetails.data.id === +queueParsed[i].id) {
        queueStorage = JSON.parse(localStorage.getItem(STORAGE_QUEUE_KEY)).find(
          (film, index) => {
            if (+responseCardDetails.data.id === +film.id) {
              console.log(index);
              queueStorage.splice(index, 1);
              localStorage.setItem(
                STORAGE_QUEUE_KEY,
                JSON.stringify(queueStorage)
              );
            }
          }
        );
        return;
      }
    }
  }
  if (localStorage.getItem(STORAGE_QUEUE_KEY)) {
    queueStorage = JSON.parse(localStorage.getItem(STORAGE_QUEUE_KEY));
    queueStorage.push(responseCardDetails.data);
    localStorage.setItem(STORAGE_QUEUE_KEY, JSON.stringify(queueStorage));
    return;
  }
  queueStorage.push(responseCardDetails.data);
  console.log(queueStorage);
  localStorage.setItem(STORAGE_QUEUE_KEY, JSON.stringify(queueStorage));
}
