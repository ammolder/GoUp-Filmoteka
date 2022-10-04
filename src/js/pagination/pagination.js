import { LocalStorPag } from './classLocalStorage';
import { pagination } from './pagination';
const paginationContainer = document.querySelector('.pagination-container');
const paginationLabContainer = document.querySelector(
  '.pagination-lab-container'
);
const STORAGE_WATCHED_KEY = 'watched-films-lib';
const STORAGE_QUEUE_KEY = 'queue-films-lib';

if (paginationContainer) {
  paginationContainer.addEventListener('click', onPagination);
}
if (paginationLabContainer) {
  paginationLabContainer.addEventListener('click', onPagination);
}

export function pagination(page, totalPages) {
  const beforeToPage = page - 2;
  const beforePage = page - 1;
  const afterToPage = page + 2;
  const afterPage = page + 1;

  globalCurrentPage = page;

  let markup = '';
  if (page > 1) {
    markup += '<li class="pagination-btn arrow-left"></li>';
  } else {
    markup += '<li class="pagination-btn arrow-left disabled" disabled></li>';
  }
  if (page > 1) {
    markup += '<li class="pagination-btn">1</li>';
  }
  if (page > 4) {
    ``;
    markup += '<li class="pagination-btn">...</li>';
  }
  if (page > 3) {
    markup += `<li class="pagination-btn">${beforeToPage}</li>`;
  }
  if (page > 2) {
    markup += `<li class="pagination-btn">${beforePage}</li>`;
  }
  markup += `<li class="pagination-btn">${page}</li>`;
  if (totalPages - 1 > page) {
    markup += `<li class="pagination-btn">${afterPage}</li>`;
  }
  if (totalPages - 2 > page) {
    markup += `<li class="pagination-btn">${afterToPage}</li>`;
  }
  if (totalPages - 3 > page) {
    markup += `<li class="pagination-btn">...</li>`;
  }
  if (totalPages > page) {
    markup += `<li class="pagination-btn">${totalPages}</li>`;
    markup += '<li class="pagination-btn arrow-right">N</li>';
  } else {
    markup += '<li class="pagination-btn arrow-right disabled">N</li>';
  }

  if (paginationContainer) {
    paginationContainer.innerHTML = markup;
  }
  if (paginationLabContainer) {
    paginationLabContainer.innerHTML = markup;
  }

  if (paginationContainer) {
    const containerItems = [...paginationContainer.children];

    containerItems.forEach(item => {
      if (Number(item.textContent) === globalCurrentPage) {
        item.classList.add('current');
      }
    });
  }
  if (paginationLabContainer) {
    const containerItems = [...paginationLabContainer.children];

    containerItems.forEach(item => {
      if (Number(item.textContent) === globalCurrentPage) {
        item.classList.add('current');
      }
    });
  }
}

// notWork

function onPagination({ target }) {
  // paginationLabContainer.setAttribute('page', `${target.textContent}`);
  +target.textContent;
  console.log(' +target.textContent :', +target.textContent);
  if (
    target.nodeName !== 'LI' ||
    target.classList.contains('request-paragraph')
  ) {
    return;
  }

  if (target.textContent === '...') {
    return;
  }

  if (target.textContent === '') {
    if (target.classList.contains('disabled')) {
      return;
    }
    globalCurrentPage -= 1;
    return;
  }

  if (target.textContent === 'N') {
    if (target.classList.contains('disabled')) {
      return;
    }
    globalCurrentPage += 1;
    return;
  }
  globalCurrentPage = Number(target.textContent);
}

const watchedFilms = JSON.parse(localStorage.getItem(STORAGE_WATCHED_KEY));
const queueFilms = JSON.parse(localStorage.getItem(STORAGE_QUEUE_KEY));
let pageNumber = 2;
console.log('pageNumber :', pageNumber);

export const localStoragePagination = new LocalStorPag(
  watchedFilms,
  queueFilms,
  pageNumber
);

function bbb(hi) {
  return (pageNumber = hi);
}
console.log('pageNumber :', pageNumber);

function createdTotalPage(object) {
  if (object !== null) {
    const totalPages = Math.ceil(object.length / 9);

    return totalPages;
  }
}
pagination(
  localStoragePagination.pageNumber,
  createdTotalPage(localStoragePagination.watchedFilms)
);

// if (refs.watched.classList.contains('active_btn')) {
//   pagination(
//     localStoragePagination.pageNumber,
//     createdTotalPage(localStoragePagination.watchedFilms)
//   );
// }
// if (refs.queue.classList.contains('active_btn')) {
//   pagination(
//     localStoragePagination.pageNumber,
//     createdTotalPage(localStoragePagination.queueFilms)
//   );
// }
