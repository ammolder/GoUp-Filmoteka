import { STORAGE_QUEUE_KEY } from './modalListeners';
import { STORAGE_WATCHED_KEY } from './modalListeners';
import { getItemsForPage } from './pagination/classForLocalStorage';
import genres from '../genres.json';

const refs = {
  watched: document.querySelector('.data-watched'),
  queue: document.querySelector('.data-queue'),
  gallery: document.querySelector('.card__list-library'),
};

let watchedLibraryList = getItemsForPage();
let queueLibraryList = JSON.parse(localStorage.getItem(STORAGE_QUEUE_KEY));
if (refs.watched) {
  refs.watched.addEventListener('click', onLibraryWatchedClick);
}
if (refs.queue) {
  refs.queue.addEventListener('click', onLibraryQueueClick);
}

function renderLibraryGallery(data) {
  const markupGallery = data
    .map(card => {
      const date = new Date(card.release_date).getFullYear();
      const genre = card.genres.length
        ? card.genres.map(genre => genre.name).join(', ')
        : 'Unknown';
      return `
      <li class="card__item" data-id="${card.id}">
      <img class="card__img"  src="https://image.tmdb.org/t/p/w500/${
        card.poster_path
      }" alt="${card.title}" data-id="${card.id}"/>
       
       <h2 class="card__title"data-id="${card.id}">${card.title}</h2>
        <p class="card__text"data-id="${card.id}">${
        genre.length ? genre : 'Unknown'
      } | ${date} </p>
    </li>`;
    })
    .join('');
  if (refs.gallery) {
    refs.gallery.innerHTML = markupGallery;
  }
}
if (watchedLibraryList) {
  renderLibraryGallery(watchedLibraryList);
}

function onLibraryWatchedClick(evt) {
  if (watchedLibraryList) {
    renderLibraryGallery(watchedLibraryList);
  }
}

function onLibraryQueueClick(evt) {
  if (queueLibraryList) {
    renderLibraryGallery(queueLibraryList);
    refs.watched.classList.remove('active_btn');
  }
}
