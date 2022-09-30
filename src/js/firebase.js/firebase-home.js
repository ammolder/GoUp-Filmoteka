import { Notify } from 'notiflix';
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

//
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
  iconLoginUser: document.querySelector('.login-user__icon'),
  userExit: document.querySelector('.user-exit'),
  exitOk: document.querySelector('.user-exit__ok'),
  exitNot: document.querySelector('.user-exit__not'),
};

let loginUserFilmoteka = false;

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
if (refs.exitOk) {
  refs.exitOk.addEventListener('click', removeUserLocalStorage);
}
if (refs.exitNot) {
  refs.exitNot.addEventListener('click', addClasModalUserLocalStorage);
}
if (refs.iconLoginUser) {
  refs.iconLoginUser.addEventListener('click', openModalExit);
}

//закрітие модельного окна с кнопками вход и регистрация
function closeFormContainerButtom() {
  refs.backdrop.classList.add('hidden');
}
// разлогинится пользователю на сайте по клику на кнопку OK
function removeUserLocalStorage() {
  localStorage.removeItem('my-loginUser');
  loginUserFilmoteka = false;
  window.location.href = './index.html';
}
function addClasModalUserLocalStorage() {
  refs.userExit.classList.add('hidden');
}

function openModalExit() {
  refs.userExit.classList.remove('hidden');
}

// при нажатии срабативает проверка на авторизацию
function сheckingUser() {
  if (!loginUserFilmoteka) {
    refs.pageLibrary.setAttribute('href', '#');
    refs.backdrop.classList.remove('hidden');
    return;
  }
  refs.pageLibrary.setAttribute('href', './library.html');
  return;
}
// добавление информации по входу в систему true или fasle
function localStorageUserTrue(boolean) {
  localStorage.setItem('my-loginUser', JSON.stringify({ loginUser: boolean }));
}

const dataSeve = JSON.parse(localStorage.getItem('my-loginUser'));
console.log(dataSeve);
//Проверка через localStorage вход на сайт
if (dataSeve === null) {
  loginUserFilmoteka = false;
  console.log(loginUserFilmoteka);
} else {
  loginUserFilmoteka = dataSeve.loginUser;
  console.log(loginUserFilmoteka);
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
    Notify.info('Not all fields are filled in!');
    return;
  }
  await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email,
      });
      Notify.success('You have successfully registered. ');
      refs.formLoginUser.classList.remove('hidden');
      refs.formSighUpUser.classList.add('hidden');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.failure(
        `Error, the user under the mail ${email} is already registered. `
      );
      console.log(`Ошибка ${errorCode} и ${errorMessage} `);
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
      Notify.success('The entry to Filmoteka was a success!');
      setTimeout(() => {
        Notify.info(
          'Hi. How are you doing? Have you added movies to your library yet?'
        );
      }, 3000);
      refs.backdrop.classList.add('hidden');
      refs.buttonSelectInput.classList.remove('hidden');
      refs.formLoginUser.classList.add('hidden');
      refs.formLoginUser.reset();
      loginUserFilmoteka = true;
      localStorageUserTrue(loginUserFilmoteka);
      window.location.href = './library.html';
      return;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.warning('You entered the wrong email or password!');
      console.log(`Ошибка ${errorCode} и ${errorMessage} `);
    });
}
