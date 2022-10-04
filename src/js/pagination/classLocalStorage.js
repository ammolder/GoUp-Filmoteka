export class LocalStorPag {
  constructor(watchedFilms, queueFilms, pageNumber) {
    this._watchedFilms = watchedFilms;
    console.log('_watchedFilms :', this._watchedFilms);
    this._queueFilms = queueFilms;
    this._pageNumber = pageNumber;
  }

  //   async fetchMovies() {
  //     const defaultQueryParams = `?api_key=${KEY}&pageNumber=${this._pageNumber}&qery=${this._query}&include_adult=false`;

  //     const response = await axios(`${this._endPoint}${defaultQueryParams}`);

  //     return response;
  //   }

  incrementpageNumber() {
    this._pageNumber += 1;
  }

  decrementpageNumber() {
    this._pageNumber -= 1;
  }

  get pageNumber() {
    return this._pageNumber;
  }

  set pageNumber(newpageNumber) {
    this._pageNumber = newpageNumber;
  }

  get watchedFilms() {
    return this._watchedFilms;
  }

  set watchedFilms(newWatchedFilms) {
    this._watchedFilms = newWatchedFilms;
  }

  get queueFilms() {
    return this._queueFilms;
  }

  set queueFilms(newQueueFilms) {
    this._queueFilms = newQueueFilms;
  }
}
