// import '../styles/style.scss';
import PicturePuzzle from './PicturePuzzle.js';
import { createBoardSizeEl, createNewGame } from './Options.js';
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

const newGameBtn = createNewGame();
wrapper.innerHTML += newGameBtn;
const boardWrapperTemplate = `
  <div class="board-wrapper"></div>
  `;
wrapper.innerHTML += boardWrapperTemplate;
//
//
// create popup
addPopup();
const popup = document.querySelector('.popup');
popup.classList.add('active');

const newGameEl = document.querySelector('.btn--start');
newGameEl.addEventListener('click', newGame);
//
//
// constructor(el, imageSrc, width, size)
function newGame() {
  const sizeEl = document.querySelector('.board_size');
  const picturePuzzle = new PicturePuzzle(
    document.querySelector('.board-wrapper'),
    './assets/imgs/1.jpg',
    600,
    sizeEl.value,
  );
  picturePuzzle.onSwap = function (numberOfMovements) {
    console.log(numberOfMovements);
  };
  picturePuzzle.onFinished = function () {
    setTimeout(() => {
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
