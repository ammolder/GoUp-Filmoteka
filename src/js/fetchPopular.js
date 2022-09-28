import axios from 'axios';
import genres from '../genres.json';
const KEY = '77e7936073a1f82fbc0d3a17a985fb5b';

async function getApi() {
  const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/day';
  const params = {
    api_key: KEY,
  };

  const resolve = await axios(BASE_URL, { params });
  renderGallery(resolve.data.results);
}
getApi();

const gallery = document.querySelector('.card__list');

export function renderGallery(data) {
  const markupGallery = data
    .map(card => {
      const genre = genres
        .map(item => {
          if (card.genre_ids.includes(item.id)) {
            return item.name;
          }
        })
        .filter(genreItem => {
          return genreItem !== undefined;
        })
        .join(', ');

      return `
      <li class="card__item" data-id="${card.id}">
  <img
    src="https://image.tmdb.org/t/p/w500/${[card.poster_path]}"
    alt="GREYHOUND"
  />
  <h2 class="card__title" data-id="${card.id}">
    ${card.title}
  </h2>
  <p class="card__text" data-id="${card.id}">
    ${genre.length ? genre : 'Unknown'} | ${card.release_date}
  </p>
</li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markupGallery);
}
