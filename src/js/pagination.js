const pagination = document.querySelector('.pagination-container');

pagination.addEventListener('click', onPagination);


function renderedPagination(page, totalPages) {
  const beforeEndPage = page - 2;
  const beforePage = page - 1;
  const afterEndPage = page + 2;
  const afterPage = page + 1;

  currentPage = page;

  let markup = '';
   if (page > 1) {
    markup += `<li class="pagination-btn>
        <svg width="16" height="16">
            <use href="./image/icons.svg#left"></use>
        </svg>

    </li>` ;
  } else {
    markup += `<li class="pagination-btn disabled" disabled="">
        <svg width="16" height="16">
            <use href="./image/icons.svg#left"></use>
        </svg>

    </li>` ;
  }

  if (page > 1) {
    markup += `<li class="pagination-btn current">1</li>`;
  }
  if (page > 4) {
    ``;
    markup += `<li class="pagination-btn">...</li>`;
  }
  if (page > 3) {
    markup += ` <li class="pagination-btn">${beforeEndPage}</li>`;
  }
  if (page > 2) {
    markup += `<li class="pagination-btn">${beforePage}</li>`;
  }
  markup += `<li class="pagination-btn">${page}</li>`;
  if (totalPages - 1 > page) {
    markup += `<li class="pagination-btn">${afterPage}</li>`;
  }
  if (totalPages - 2 > page) {
    markup += `<li class="pagination-btn">${afterEndPage}</li>`;
  }
  if (totalPages - 3 > page) {
    markup += `<li class="pagination-btn">...</li>`;
  }
  if (totalPages > page) {
    markup += `<li class="pagination-btn">${totalPages}</li>`;
    markup += ` <li class="pagination-btn">
        <svg width="16" height="16">
            <use href="./image/icons.svg#right"></use>
        </svg>
    </li>`;
  } else {
    markup += ` <li class="pagination-btn disabled">
        <svg width="16" height="16">
            <use href="./image/icons.svg#right"></use>
        </svg>
    </li>`;
  }

  pagination.innerHTML = markup;

  const containerItems = [...pagination.children];

  containerItems.forEach(item => {
    if (Number(item.textContent) === currentPage) {
      item.classList.add('current');
    }
  });
}

function onPagination(evt ) {
  if (evt.target.nodeName !== `LI`) {
    return;
  }

  if (evt.textContent === `...`) {
    return;
  }

  if (evt.textContent === `<svg width="16" height="16">
            <use href="./image/icons.svg#left"></use>
        </svg>`) {
    if (evt.classList.contains('disabled')) {
      return;
    }
   сurrentPage -= 1;
    return;
  }

  if (evt.textContent === `<svg width="16" height="16">
            <use href="./image/icons.svg#right"></use>
        </svg>`) {
    if (evt.classList.contains('disabled')) {
      return;
    }
    currentPage += 1;
    return;
  }
 сurrentPage = Number(evt.textContent);
}


