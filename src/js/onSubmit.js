// import { getApi } from './js/searchApi';
import { renderGallery } from './renderList';
import { getApi } from './searchApi';
import { onClickCard } from './modalListeners';
// IMPORT PRELOADER SPINNER
import {preloaderAnimation} from './loader/preloaderSpinner.js'
preloaderAnimation()

// IMPORT SUBMIT SPINNER

import {displayLoading} from './loader/submitSpinner.js'
import {hideLoading} from './loader/submitSpinner.js'

const cardList = document.querySelector('.card__list');
const form = document.querySelector('.header-search');
form.addEventListener('submit', onSubmitForm);
cardList.addEventListener('click', onClickCard);

export async function onSubmitForm(evt) {
  evt.preventDefault();

hideLoading()
  const searchName = evt.currentTarget.elements.querySearch.value;
  const response = await getApi(searchName);

  console.log(response.data.results);
  renderGallery(response.data.results);
}
