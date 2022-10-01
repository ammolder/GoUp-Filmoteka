import NewApi from './fetch-movies-homepg';
import { pagination } from './pagination';
import { FetchMoviesAPI } from './fetchMoviesAPI';
import { onSearchPaginationClick } from './searchFilmPaginationAndRenderCard';
import genres from '../../genres.json';

export const APIEndPoints = {
  trendingMovie: '/3/trending/movie/day',
  searchMovie: '/3/search/movie',
  movieDetails: `/3/movie/`,
};

const fetchTrandingMovieAPI = new FetchMoviesAPI(APIEndPoints.trendingMovie);

// this problem dostallo

const newApi = new NewApi();
const refs = {
  gallery: document.querySelector('.card__list'),
};

export async function appendMarkupMovies() {
  let response;

  try {
    response = await newApi.fetchMovies();
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      markupMovies(response.data.results)
    );
  } catch (error) {
    console.log(error.message);
  }
  return response.data;
}

appendMarkupMovies().then(data => {
  const paginationItemsContainer = document.querySelector(
    '.pagination-container'
  );

  paginationItemsContainer.innerHTML = '';

  paginationItemsContainer.removeEventListener(
    'click',
    onSearchPaginationClick
  );
  paginationItemsContainer.addEventListener('click', onTrendingPaginationClick);
  pagination(data.page, data.total_pages);
});

// end dostallo
export async function onTrendingPaginationClick({ target }) {
  if (
    target.nodeName === 'UL' ||
    target.classList.contains('disabled') ||
    Number(target.textContent) === fetchTrandingMovieAPI.page
  ) {
    return;
  }

  fetchTrandingMovieAPI.page = globalCurrentPage;
  let response;

  try {
    response = await fetchTrandingMovieAPI.fetchMovies();
  } catch (err) {
    console.log('ERROR: ', err.message);
    console.log('ERROR CODE: ', err.code);
  }

  const galleryMarkup = markupMovies(response.data.results);
  // clearGalleryMarkup();
  renderGalleryMarkup(galleryMarkup);

  pagination(response.data.page, response.data.total_pages);
}

function renderGalleryMarkup(markup) {
  refs.gallery.innerHTML = markup;
}

// ---------------------not open

//   refs.gallery.insertAdjacentHTML('beforeend', markup);

// -------Функция удаления разметки галлереи-------

// function clearGalleryMarkup() {
//   refs.gallery.innerHTML = '';
// }
// import { findGenresOfMovie } from './find-genres-of-popular-movies';
export function findGenresOfMovie(ids) {
  const arr = ids.flatMap(id => genres.filter(element => element.id === id));
  const movieGenres = arr.map(el => el.name);
  if (movieGenres.length > 2) {
    const removedGenres = movieGenres.splice(0, 2);
    removedGenres.push('Other');

    return removedGenres.join(', ');
  }
  return movieGenres.join(', ');
}
export function markupMovies(movies) {
  return movies
    .map(({ poster_path, title, genre_ids, release_date, id }) => {
      const date = new Date(release_date).getFullYear();
      if (poster_path) {
        return `
      <li class="card" data-id="${id}">
        <img class="card__img" src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}" data-id="${id}"/>
        <div class="card__wrap" data-id="${id}">
        <p class="card__titel" data-id="${id}">
        ${title} <br />
          <span class="card__text">${findGenresOfMovie(
            genre_ids
          )} | ${date}</span>
        </p> </div>
  </li>`;
      }
      return `
      <div class="card" data-id="${id}">
        <img class="card__img" src="" alt="${title}" data-id="${id}"/>
        <p class="card__titel" data-id="${id}">
        ${title} <br />
          <span class="card__text">${findGenresOfMovie(
            genre_ids
          )} | ${date}</span>
        </p>
  </div>`;
    })
    .join('');
}
