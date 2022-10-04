import axios from 'axios';

// async function fetchMovies() {
//   const defaultQueryParams = `?api_key=${KEY}&page=${this._page}&qery=${this._query}&include_adult=false`;
//   const response = await axios(`${URL}${this._endPoint}${defaultQueryParams}`);
//   return response;
// }

// // fetchMovies().then(response => {
// //   console.log(response);
// // });
// console.log(fetchMovies());
const refs = {
  lisrTopFilms: document.querySelector('.glide__slides'),
  item: document.querySelectorAll('.glide__slide'),
};
console.log(refs.item);

const API_KEY = '77e7936073a1f82fbc0d3a17a985fb5b';
const URL = 'https://api.themoviedb.org/3';
const API_URL = `${URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG = 'https://image.tmdb.org/t/p/w500';

async function getMovies() {
  await fetch(API_URL)
    .then(res => {
      return res.json();
    })
    .then(res => {
      render(res.results);
    });
}
getMovies();

async function render(data) {
  // const list = data
  //   .map(item => {
  //     return `
  //     <img class='slider__img' src="${IMG}${item.poster_path}" alt="${item.title}" id='${item.id}/>
  //     `
  //   })
  //   .join('');
  data.forEach((item, i) => {
    if (!item.poster_path) {
      console.log(item.poster_path);
      refs.item[
        i
      ].innerHTML = `<img class='slider__img' src="./image/card.jpg" alt="${item.title}" id='${item.id}'/>`;
      return;
    }
    refs.item[
      i
    ].innerHTML = `<img class='slider__img' src="${IMG}${item.poster_path}" alt="${item.title}" id='${item.id}'/>`;
  });

  refs.itemCard = document.querySelector('.slider__item');
}

import Glide, {
  Controls,
  Breakpoints,
  Autoplay,
} from '@glidejs/glide/dist/glide.modular.esm';

new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 8,
  autoplay: 4000,
  hoverpause: true,
  bound: true,
  breakpoints: {
    1280: {
      perView: 7,
    },
    768: {
      perView: 6,
    },
    480: {
      perView: 3,
    },
    320: {
      perView: 2,
    },
  },
}).mount({ Controls, Breakpoints, Autoplay });
