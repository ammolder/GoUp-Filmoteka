import { FetchMoviesAPI } from './fetchMoviesAPI';
import { pagination } from './pagination';
import { getArrayWatchedAndQueue } from '../modalListeners';
const paginationLabContainer = document.querySelector(
  '.pagination-lab-container'
);
const localStoragePagination = new FetchMoviesAPI();

localStoragePagination.watchedFilms = getArrayWatchedAndQueue.watchedStorage;
localStoragePagination.queueFilms = getArrayWatchedAndQueue.queueStorage;
// localStoragePagination.pageNumber =
//   +paginationLabContainer.getAttribute('page');

function createdTotalPage(library) {
  if (library !== null) {
    const totalPages = Math.ceil(library.length / 9);

    return totalPages;
  }
}

let masiv = getArrayWatchedAndQueue.watchedStorage;

let page = localStoragePagination._pageNumber;

const step = 9;

export function getItemsForPage() {
  return masiv.slice((page - 1) * step, page * step);
}

getItemsForPage();

pagination(
  localStoragePagination.pageNumber,
  createdTotalPage(localStoragePagination.watchedFilms)
);
