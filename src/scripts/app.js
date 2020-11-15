// import '../styles/style.scss';
import PicturePuzzle from './PicturePuzzle.js';
import createBoardSizeEl from './Options.js';


const boardSizeEl = createBoardSizeEl();
// document.body.innerHTML += boardSizeEl;

// wrapper
function addWrapper() {
  console.log('im working');
  const wrapperTemplate = `
  <div id="puzzle-wrapper" class="wrapper"></div>
  `;
  document.body.innerHTML = wrapperTemplate;
  // document.body.prepend(wrapper);
}
window.onload = addWrapper();

const picturePuzzle = new PicturePuzzle(
  document.querySelector('.wrapper'),
  './assets/imgs/1.jpg',
  600,
);