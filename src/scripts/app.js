// import '../styles/style.scss';
// import '1.jpg' from './assets/imgs/1.jpg';
import PicturePuzzle from './PicturePuzzle.js';
import { createBoardSizeEl, createNewGame, createNextImgBtn } from './Options.js';
import addPopup from './Popup.js';

// wrapper
function addWrapper() {
  const wrapperTemplate = `
  <div id="puzzle-wrapper" class="wrapper"></div>
  `;
  document.body.innerHTML = wrapperTemplate;
}
window.onload = addWrapper();

const wrapper = document.querySelector('.wrapper');
const boardSize = createBoardSizeEl();
wrapper.innerHTML += boardSize;

// new game button
const newGameBtn = createNewGame();
wrapper.innerHTML += newGameBtn;

// next image button
const nextImageBtn = createNextImgBtn();
wrapper.innerHTML += nextImageBtn;

const boardWrapperTemplate = `
  <div class="board-wrapper"></div>
  `;
wrapper.innerHTML += boardWrapperTemplate;
//
//
// create popup
addPopup();
const popup = document.querySelector('.popup');

const newGameEl = document.querySelector('.btn--start');
newGameEl.addEventListener('click', newGame);
//
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
  popup.classList.remove('active');
  const sizeEl = document.querySelector('.board_size');
  const picturePuzzle = new PicturePuzzle(
    document.querySelector('.board-wrapper'),
    currentImgSrc,
    600,
    sizeEl.value,
  );
  // eslint-disable-next-line func-names
  picturePuzzle.onSwap = function (numberOfMovements) {
    console.log(numberOfMovements);
  };
  // eslint-disable-next-line func-names
  picturePuzzle.onFinished = function () {
    setTimeout(() => {
      popup.classList.add('active');
      popup.classList.add('open');
      this.el.classList.add('blur');
    }, 700);
    popup.querySelector('.icon--close').onclick = () => {
      popup.classList.remove('open');
      this.el.classList.remove('blur');
    };
  };
  return picturePuzzle;
}

// run
newGame();
