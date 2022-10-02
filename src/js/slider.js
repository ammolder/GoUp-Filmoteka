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
  lisrTopFilms: document.querySelector('.slider__list'),
};

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

function render(data) {
  const list = data
    .map(item => {
      return `
        <li class="slider__item" id='${item.id}'>
      <img src="${IMG}${item.poster_path}" alt="${item.title}"/>
    </li>`;
    })
    .join('');
  console.log(list);
  refs.lisrTopFilms.insertAdjacentHTML('beforeend', list);
  refs.itemCard = document.querySelector('.slider__item');
  //   refs.itemCard.addEventListener('click', removeClassHidden);
}

// setInterval(() => {
//   console.log('setInterval');
// }, 7000);

// $('.autoplay').slick({
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 2000,
// });
