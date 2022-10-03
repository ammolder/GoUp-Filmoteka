import axios from 'axios';
import image from '../../image/card.jpg';
import { pagination } from './pagination';
import { FetchMoviesAPI } from './fetchMoviesAPI';
import genres from '../../genres.json';
import { onTrendingPaginationClick } from './popularFilmsPaginationAndRenderCard';

export const APIEndPoints = {
  trendingMovie: '/3/trending/movie/day',
  searchMovie: '/3/search/movie',
  movieDetails: `/3/movie/`,
};

const KEY = '77e7936073a1f82fbc0d3a17a985fb5b';
const URL = 'https://api.themoviedb.org';

async function fetchMovies(query, page) {
  try {
    const response = await axios.get(
      `${URL}/3/search/movie?api_key=${KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

const fetchSearchMoviesResultsAPI = new FetchMoviesAPI(
  APIEndPoints.searchMovie
);

const formSearch = document.querySelector('.header-search');
const errorText = document.querySelector('.request-paragraph');

let query = '';
let page = 1;

if (formSearch) {
  formSearch.addEventListener('submit', onSearchMovies);
}
function onSearchMovies(event) {
  event.preventDefault();
  console.dir(event.currentTarget.elements);
  query = event.currentTarget.elements.querySearch.value;

  if (!query) {
    errorText.classList.remove('visually-hidden');
    setTimeout(() => {
      errorText.classList.add('visually-hidden');
    }, 3000);
    return;
  }

  fetchMovies(query, page).then(({ data }) => {
    if (!data.total_results) {
      errorText.classList.remove('visually-hidden');
      setTimeout(() => {
        errorText.classList.add('visually-hidden');
      }, 3000);
    } else {
      clearGalleryMarkup();

      renderCardMovies(data.results);

      const paginationItemsContainer = document.querySelector(
        '.pagination-container'
      );

      paginationItemsContainer.innerHTML = '';
      paginationItemsContainer.removeEventListener(
        'click',
        onTrendingPaginationClick
      );
      paginationItemsContainer.addEventListener(
        'click',
        onSearchPaginationClick
      );
      pagination(data.page, data.total_pages);
    }
  });
}

export async function onSearchPaginationClick({ target }) {
  if (
    target.nodeName === 'UL' ||
    target.classList.contains('disabled') ||
    Number(target.textContent) === fetchSearchMoviesResultsAPI.page
  ) {
    return;
  }

  fetchSearchMoviesResultsAPI.page = globalCurrentPage;
  fetchSearchMoviesResultsAPI.query = `&query=${query}`;
  let response;

  try {
    response = await fetchSearchMoviesResultsAPI.fetchMovies();
  } catch (err) {
    console.log('ERROR: ', err.message);
    console.log('ERROR CODE: ', err.code);
  }

  clearGalleryMarkup();

  const galleryMarkup = renderCardMovies(response.data.results);

  pagination(response.data.page, response.data.total_pages);
}

function clearGalleryMarkup() {
  galleryContainerMovies.innerHTML = '';
}
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

const galleryContainerMovies = document.querySelector('.card__list');

function renderCardMovies(movies) {
  const markup = movies
    .map(movie => {
      const { poster_path, title, genre_ids, release_date, id } = movie;
      const date = new Date(release_date).getFullYear();
      if (poster_path) {
        return `
           <div class="card" data-id="${id}" id="${id}">
        <img class="card__img" src="https://image.tmdb.org/t/p/w400${poster_path}"  alt="${title}
" data-id="${id}"/>
        <p class="card__title" data-id="${id}">
          ${title} <br />
          <span class="card__text">${findGenresOfMovie(
            genre_ids
          )} | ${date}</span>
        </p>
      </div>`;
      }
      return `
           <div class="card" data-id="${id}" id="${id}">
        <img class="card__img"  src="${image}" alt="${title}
" data-id="${id}"/>
        <p class="card__title" data-id="${id}">
          ${title} <br />
          <span class="card__text">${findGenresOfMovie(
            genre_ids
          )} | ${date}</span>
        </p>
      </div>`;
    })
    .join('');

  galleryContainerMovies.innerHTML = markup;
  window.scrollTo({
    top: 100,
    left: 100,
    behavior: 'smooth',
  });
}
