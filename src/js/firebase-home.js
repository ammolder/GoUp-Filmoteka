import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, update } from 'firebase/database';

import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

// Конфигурация Firebase вашего веб-приложения
// Для Firebase JS SDK v7.20.0 и более поздних версий, measureId необязателен
const firebaseConfig = {
  apiKey: 'AIzaSyC4axheHgy30RAlpQyWJSvsbT5mQm6T9AA',
  authDomain: 'goup-filmoteka.firebaseapp.com',
  databaseURL: 'https://goup-filmoteka-default-rtdb.firebaseio.com',
  projectId: 'goup-filmoteka',
  storageBucket: 'goup-filmoteka.appspot.com',
  messagingSenderId: '720228305884',
  appId: '1:720228305884:web:3e134cf761d2d193e65d19',
  measurementId: 'G-7JJQJB9HNZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Инициализировать базу данных реального времени и получить ссылку на сервис
const database = getDatabase(app);
const auth = getAuth(app);
const refs = {
  onLogin: document.getElementById('login-sighUp'),
  pageLibrary: document.getElementById('firebase-library'),
  backdrop: document.querySelector('.backdrop-fr'),
  btnSighUpBtn: document.getElementById('sign-up-btn'),
  btnSighInBtn: document.getElementById('sign-in-btn'),
  formSighUpUser: document.getElementById('login-sighUp'),
  formLoginUser: document.getElementById('login-box'),
  buttonSelectInput: document.querySelector('.form-button'),
  closeFormLogin: document.querySelector('.form-login__close '),
  closeFormSighUp: document.querySelector('.form-sighUp__close'),
  closeFormContainerButtom: document.getElementById('form-button__close'),
};

let loginUserFilmoteka = true;
refs.onLogin.addEventListener('submit', onSubmitUser);
refs.pageLibrary.addEventListener('click', сheckingUser);
refs.closeFormLogin.addEventListener('click', onCloseFormLogin);
refs.btnSighInBtn.addEventListener('click', onFormLogin);
refs.btnSighUpBtn.addEventListener('click', onFormSighUp);
refs.closeFormSighUp.addEventListener('click', onCloseFormSighUp);
refs.formLoginUser.addEventListener('submit', onLoginUser);
refs.closeFormContainerButtom.addEventListener(
  'click',
  closeFormContainerButtom
);
//закрітие модельного окна с кнопками вход и регистрация
function closeFormContainerButtom() {
  refs.backdrop.classList.add('hidden');
}

// при нажатии срабативает проверка на авторизацию
function сheckingUser() {
  if (loginUserFilmoteka) {
    refs.pageLibrary.setAttribute('href', '#');
    refs.backdrop.classList.remove('hidden');

    return;
  }
}
// кнопка закрытия формы для входа на сайт
function onCloseFormLogin() {
  refs.backdrop.classList.add('hidden');
  refs.buttonSelectInput.classList.remove('hidden');
  refs.formLoginUser.classList.add('hidden');
}
// откритые окна для входа
function onFormLogin() {
  refs.btnSighUpBtn.classList.remove('hidden');
  refs.buttonSelectInput.classList.add('hidden');
  refs.formLoginUser.classList.remove('hidden');
}
// окно регистрации
function onFormSighUp() {
  refs.formSighUpUser.classList.remove('hidden');
  refs.buttonSelectInput.classList.add('hidden');
}
// кнопка закрытия формы для регистрации
function onCloseFormSighUp() {
  refs.backdrop.classList.add('hidden');
  refs.buttonSelectInput.classList.remove('hidden');
  refs.formSighUpUser.classList.add('hidden');
}
// регистрация пользователя на сайте
async function onSubmitUser(e) {
  e.preventDefault();
  const username = e.target.elements.username.value;
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;

  console.log(username);
  console.log(email);
  console.log(password);
  //Перевірка на заповненість полів форми
  if (!email || !password || !username) {
    console.log('Форма пустая или частично пустая!!!');
    return;
  }
  await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email,
      });
      alert('Пользователь добавлен');
      refs.backdrop.classList.add('hidden');
      refs.buttonSelectInput.classList.remove('hidden');
      refs.formSighUpUser.classList.add('hidden');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(` Пользователь ${email} уже есть!`);
    });

  refs.onLogin.reset();
}

// Залогиниться на сайте
async function onLoginUser(e) {
  e.preventDefault();
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;

  await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const dt = new Date();
      const user = userCredential.user;
      update(ref(database, 'users/' + user.uid), {
        last_login: dt,
      });
      alert('Пользователь вошел в Filmoteca');
      refs.backdrop.classList.add('hidden');
      refs.buttonSelectInput.classList.remove('hidden');
      refs.formLoginUser.classList.add('hidden');
      refs.formLoginUser.reset();
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Попробуйте еще раз, такого пользователя нет');
    });
}
// const user = auth.currentUser;

// if (user) {
//   console.log(`Пользователь ${user} есть в системе`);
// } else {
//   console.log('No user is signed in');
// }
