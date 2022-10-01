import axios from 'axios';
import genres from '../genres.json';
import { onClickCard } from '..';

const gallery = document.querySelector('.card__list');
const gallery_library = document.querySelector('.card__list-library');

export function renderGallery(data) {
  const markupGallery = data
    .map(card => {
      const date = new Date(card.release_date).getFullYear();
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
      <img class="card__img" src="https://image.tmdb.org/t/p/w500/${[
        card.poster_path,
      ]}" alt="${card.title}" data-id="${card.id}"/>
       <h2 class="card__title" data-id="${card.id}">${card.title}</h2>
        <p class="card__text" data-id="${card.id}">${
        genre.length ? genre : 'Unknown'
      } | ${date} </p>
    </li>`;
    })
    .join('');
  if (gallery) {
    gallery.innerHTML = markupGallery;
  }
  if (gallery_library) {
    gallery_library.innerHTML = markupGallery;
  }
}
