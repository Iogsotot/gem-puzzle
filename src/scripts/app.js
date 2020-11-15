// import '../styles/style.scss';
import PicturePuzzle from './PicturePuzzle.js';
import { createBoardSizeEl, createNewGame } from './Options.js';

// wrapper
function addWrapper() {
  console.log('im working');
  const wrapperTemplate = `
  <div id="puzzle-wrapper" class="wrapper"></div>
  `;
  document.body.innerHTML = wrapperTemplate;
}
window.onload = addWrapper();

const wrapper = document.querySelector('.wrapper');
const boardSize = createBoardSizeEl();
wrapper.innerHTML += boardSize;
const sizeEl = document.querySelector('.board_size');

const newGameBtn = createNewGame();
wrapper.innerHTML += newGameBtn;
//
//
//
// constructor(el, imageSrc, width, size)
function newGame() {
  const picturePuzzle = new PicturePuzzle(
    document.querySelector('.wrapper'),
    './assets/imgs/1.jpg',
    600,
    sizeEl.value,
  );
  return picturePuzzle;
}

const newGameEl = document.querySelector('.btn--start');
newGameEl.addEventListener('click', newGame);

// run
newGame();
