import axios from 'axios';
import { renderCardMovies } from './render-movies-card';
import { pagination } from './pagination';
import { FetchMoviesAPI } from './fetchMoviesAPI';

import { onTrendingPaginationClick } from './append-movie-cards';

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
const galleryContainerMovies = document.querySelector('.gallery__box');

let query = '';
let page = 1;

if (formSearch) {
  formSearch.addEventListener('submit', onSearchMovies);
}

function onSearchMovies(event) {
  event.preventDefault();
  console.dir(event.currentTarget.elements);
  query = event.currentTarget.elements.querySearch.value;
  // query = event.currentTarget.elements.text.value;

  // if (!query) {
  //   onResultSearchError();
  //   return;
  // }

  fetchMovies(query, page).then(({ data }) => {
    if (!data.total_results) {
      onResultSearchError();
    } else {
      // clearGalleryMarkup();

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

  // clearGalleryMarkup();

  const galleryMarkup = renderCardMovies(response.data.results);

  pagination(response.data.page, response.data.total_pages);
}

// function clearGalleryMarkup() {
//   galleryContainerMovies.innerHTML = '';
// }
