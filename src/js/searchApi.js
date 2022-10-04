import axios from 'axios';

import {displayLoading} from './loader/submitSpinner.js'

export async function getApi(name) {
  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
  const params = {
    api_key: '7f524807c48f906ff0108130fa25f727',
    query: `${name}`,
  };
  displayLoading()
  const resolve = await axios(BASE_URL, { params });
  return resolve;
}
