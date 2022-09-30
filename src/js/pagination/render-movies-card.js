// import { findGenresOfMovie } from './find-genres-of-popular-movies';

import genres from '../../genres.json';

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

export { renderCardMovies };

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
        <p class="card__titel" data-id="${id}">
          ${title} <br />
          <span class="card__text">${findGenresOfMovie(
            genre_ids
          )} | ${date}</span>
        </p>
      </div>`;
      }
      return `
           <div class="card" data-id="${id}" id="${id}">
        <img class="card__img"  src="" alt="${title}
" data-id="${id}"/>
        <p class="card__titel" data-id="${id}">
          ${title} <br />
          <span class="card__text">${findGenresOfMovie(
            genre_ids
          )} | ${date}</span>
        </p>
      </div>`;
    })
    .join('');

  galleryContainerMovies.innerHTML = markup;

  // galleryContainerMovies.insertAdjacentHTML('beforeend', markup);
}
