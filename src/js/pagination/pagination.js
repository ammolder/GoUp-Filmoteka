const paginationContainer = document.querySelector('.pagination-container');
paginationContainer.addEventListener('click', onPagination);

window.globalCurrentPage = null;

export function pagination(page, totalPages) {
  const beforeToPage = page - 2;
  const beforePage = page - 1;
  const afterToPage = page + 2;
  const afterPage = page + 1;

  globalCurrentPage = page;

  let markup = '';
  if (page > 1) {
    markup += '<li class="pagination-btn">&#129144;</li>';
  } else {
    markup += '<li class="pagination-btn disabled" disabled>&#129144;</li>';
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
    markup += '<li class="pagination-btn">&#129146;</li>';
  } else {
    markup += '<li class="pagination-btn disabled">&#129146;</li>';
  }

  paginationContainer.innerHTML = markup;

  const containerItems = [...paginationContainer.children];

  containerItems.forEach(item => {
    if (Number(item.textContent) === globalCurrentPage) {
      item.classList.add('current');
    }
  });
}

function onPagination({ target }) {
  if (target.nodeName !== 'LI') {
    return;
  }

  if (target.textContent === '...') {
    return;
  }

  if (target.textContent === '🡸') {
    if (target.classList.contains('disabled')) {
      return;
    }
    globalCurrentPage -= 1;
    return;
  }

  if (target.textContent === '🡺') {
    if (target.classList.contains('disabled')) {
      return;
    }
    globalCurrentPage += 1;
    return;
  }
  globalCurrentPage = Number(target.textContent);
}










// import { onSubmitForm } from "./onSubmit";
// import { getApPop } from "./renderPop";
// import { renderGallery } from "./renderList";



// const refs = {
//     paginationList:document.querySelector('.pagination'),
//     paginationListLibrary: document.querySelector('.pagination.pagination__library'),
// }


// export function renderPagination(allPages, page) {
//     let paginationMarkup = '';
//     let beforePreviousPage = page - 2;
//     let previousPage = page - 1;
//     let nextPage = page + 1;
//     let afterNextPage = page + 2;
//     globalPage = page;
//     if (allPages <= 1) {
//         return deletePagination();
//     }

//     if (page > 1) {
//         paginationMarkup += `<li class="pagination-item pagination-arrow">&lt;</li>`;
//     }

//     if (page > 3) {
//         if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//             paginationMarkup += `<li class="pagination-item pagination-pages">1</li>`;
//         }
//     }

//     if (page > 2) {
//         if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && page > 4) {
//             paginationMarkup += `<li class="pagination-item">...</li>`;
//         }
//         if (beforePreviousPage > 0) {
//             paginationMarkup += `<li class="pagination-item pagination-pages">${beforePreviousPage}</li>`;
//         }
//     }

//     if (previousPage > 0) {
//         paginationMarkup += `<li class="pagination-item pagination-pages">${previousPage}</li>`;
//     }

//     paginationMarkup += `<li class="pagination-item pagination-pages current-page">${page}</li>`;

//     if (page < allPages) {
//         paginationMarkup += `<li class="pagination-item pagination-pages">${nextPage}</li>`;
//     }

//     if (page < allPages - 1) {

//         if (page < allPages - 2) {
//             paginationMarkup += `<li class="pagination-item pagination-pages">${afterNextPage}</li>`;
//             if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && page < allPages - 3) {
//                 paginationMarkup += `<li class="pagination-item">...</li>`;
//             }
//         }
//         if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//             paginationMarkup += `<li class="pagination-item pagination-pages">${allPages}</li>`;
//         }
//     }

//     if (page < allPages) {
//         paginationMarkup += `<li class="pagination-item pagination-arrow">&gt;</li>`;
//     }

//     refs.paginationList.innerHTML = paginationMarkup;

//     refs.paginationList.addEventListener('click', onPaginationChoice);
// }

// function onPaginationChoice(e) {
//   if (e.target.nodeName !== 'LI') {
//     return;
//   }
//   const value = e.target.textContent;
//   switch (value) {
//     case '<':
//       globalPage -= 1;
//       break;
//     case '>':
//       globalPage += 1;
//       break;
//     case '...':
//       return;
//     default:
//       globalPage = value;
//   }
//   window.scroll({
//         top: 100,
//         left: 100,
//         behavior: 'smooth'
//     });


//   resetGallery();


//   if (refs.searchInput.value) {
//     onSubmitForm(refs.searchInput.value, globalPage)
//       .then(inputValue => {
       

//         renderGallery(inputValue.results);
//         renderPagination(inputValue.total_pages, inputValue.page);
//         save("numberOfPage", inputValue.page);
//       }).catch(err => console.log(err));
//   } else {
//     getApPop(globalPage).then((filmSet) => {
 
//       const filmArray = filmSet.results;
//       const totalPagesMovie = filmSet.total_pages;
//       renderGallery(filmArray);
    
//       renderPagination(totalPagesMovie, filmSet.page);
//       save("numberOfPagePopular", filmSet.page);
//   }).catch(err => console.log(err));
//   }
// }

// export function deletePagination() {
//   refs.paginationList.innerHTML = '';
//   refs.paginationListLibrary.innerHTML = "";
// }


// function resetGallery() {
//     refs.movieGallery.innerHTML = "";
// }