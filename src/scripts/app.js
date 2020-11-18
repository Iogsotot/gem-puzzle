// import '../styles/style.scss';
// import '1.jpg' from './assets/imgs/1.jpg';
import PicturePuzzle from './PicturePuzzle.js';
import createTemplate from './Template.js';
import addPopup from './Popup.js';
import audio from './Audio.js';

// wrapper
function addWrapper() {
  const wrapperTemplate = `
  <div id="puzzle-wrapper" class="wrapper"></div>
  `;
  document.body.innerHTML = wrapperTemplate;
}
window.onload = addWrapper();

// add all HTML (except board)
const wrapper = document.querySelector('.wrapper');
const HTMLTemplate = createTemplate();
wrapper.innerHTML += HTMLTemplate;

const boardWrapperTemplate = `
  <div class="board-wrapper"></div>
  `;
wrapper.innerHTML += boardWrapperTemplate;
//
//
// create popup
addPopup();
const popup = document.querySelector('.popup');
// add audion on page
audio();
// new game onclick
const newGameEl = document.querySelector('.btn--start');
newGameEl.addEventListener('click', newGame);
//
// change img onclick
let currentImg = 1;
const nextImageBtnEl = document.querySelector('.btn--next');
function getImgSrc(someImg) {
  const src = `./assets/imgs/${someImg}.jpg`;
  if (someImg > 150) {
    // eslint-disable-next-line no-param-reassign
    someImg = 1;
    currentImg = 1;
    return `./assets/imgs/${1}.jpg`;
  }
  return src;
}
let currentImgSrc = getImgSrc(currentImg);
nextImageBtnEl.addEventListener('click', () => { currentImg += 1; currentImgSrc = getImgSrc(currentImg); newGame(); console.log(currentImg, currentImgSrc); });
// console.log(currentImgSrc);
//
//
// constructor(el, imageSrc, width, size)
function newGame() {
  // timer exist - in first call
  const time = document.querySelector('.time');
  let hour = 0;
  let min = 0;
  let sec = 0;
  function timer() {
    sec += 1;
    if (sec > 59) {
      sec = 0;
      min += 1;
    }
    if (min > 59) {
      min = 0;
      hour += 1;
    }
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  }
  function updateTime() {
    timer();
    setTimeout(updateTime, 1000);
  }
  // Add Zeros
  function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }
  updateTime();
  //
  //
  //
  const movesEl = document.querySelector('.moves');
  movesEl.innerText = 0;
  popup.classList.remove('active');
  const sizeEl = document.querySelector('.board_size');
  const picturePuzzle = new PicturePuzzle(
    document.querySelector('.board-wrapper'),
    currentImgSrc,
    600,
    sizeEl.value,
  );

  // eslint-disable-next-line func-names
  picturePuzzle.onSwap = function (moveCounts) {
    // eslint-disable-next-line no-shadow
    const movesEl = document.querySelector('.moves');
    movesEl.innerText = moveCounts;
    console.log(movesEl.innerText);
  };
  // eslint-disable-next-line func-names
  picturePuzzle.onFinished = function () {
    setTimeout(() => {
      popup.classList.add('active');
      popup.classList.add('open');
      this.el.classList.add('blur');
    }, 700);
    // popup.querySelector('.icon--close').onclick = () => {
    //   popup.classList.remove('open');
    //   this.el.classList.remove('blur');
    // };
  };
  return picturePuzzle;
}

const btnToggle = document.querySelector('.btn--toggle');
btnToggle.addEventListener('click', () => {
  btnToggle.classList.toggle('turn');
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    // eslint-disable-next-line no-param-reassign
    cell.classList.toggle('hide');
  });
});

// run
newGame();
