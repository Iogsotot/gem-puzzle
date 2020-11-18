import Cell from './Cell.js';

const audio = document.querySelector('audio');
export default class PicturePuzzle {
  constructor(el, currentImg, width, size = 3) {
    this.parentEl = el;
    this.boardSize = size;
    this.imageSrc = currentImg;
    this.width = width;
    this.cells = [];
    this.shuffling = false;
    this.moveCounts = 0;
    this.soundEnabled = true;
    this.audio = audio;

    this.onFinished = () => {};
    this.onSwap = () => {};

    this.init();
    const img = new Image();
    img.onload = () => {
      console.log(img.width, img.height);
      this.height = (img.height * this.width) / img.width;
      this.el.style.width = `${this.width / 10}rem`;
      this.el.style.height = `${this.height / 10}rem`;
      this.setup();
    };
    img.src = this.imageSrc;
  }

  init() {
    this.parentEl.innerHTML = '';
    this.el = this.createWrapper();
    this.parentEl.appendChild(this.el);
  }

  // eslint-disable-next-line class-methods-use-this
  createWrapper() {
    const div = document.createElement('div');
    div.classList.add('board');
    div.style.position = 'relative';
    div.style.margin = '0 auto';
    return div;
  }

  setup() {
    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      this.cells.push(new Cell(this, i));
    }
    this.shuffle();
    // console.log(this.cells);
  }

  // true shuffle
  shuffle() {
    this.shuffling = true;
    for (let i = this.cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      this.swapCells(i, j);
    }
    this.shuffling = false;
  }

  // getPossiblesForCell(i) {
  //   const currentCellIndex = this.findPosition(this.index);
  //   const emptyCellIndex = this.findEmpty();
  //   const { x, y } = this.getXY(currentCellIndex);
  //   const { x: emptyX, y: emptyY } = this.getXY(emptyCellIndex);

  //   if ((x === emptyX || y === emptyY)
  //       && (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)) {
  //       }
  // }

  // controlledShuffle() {
  //   this.shuffling = true;
  //   for (let i = this.permutations; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     this.swapCells(i, j);
  //   }
  //   this.shuffling = false;
  // }

  swapCells(i, j, animate) {
    this.cells[i].setPosition(j, animate, i);
    this.cells[j].setPosition(i);
    [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
    if (!this.shuffling && this.isAssembled()) {
      if (this.onFinished && typeof this.onFinished === 'function') {
        this.onFinished.call(this);
      }
    }
    // console.log(this.cells);
  }

  isAssembled() {
    for (let i = 0; i < this.cells.length; i++) {
      if (i !== this.cells[i].index) {
        if (i === 6 && this.cells[i].index === 8 && this.cells[i + 1].index === i + 1) {
          return true;
        }
        return false;
      }
    }
    return true;
  }

  findPosition(index) {
    return this.cells.findIndex((cell) => cell.index === index);
  }

  findEmpty() {
    return this.cells.findIndex((cell) => cell.isEmpty);
  }

  changeSoundSetting() {
    if (this.soundEnabled) this.soundEnabled = false;
    else this.soundEnabled = true;
  }
}

window.PicturePuzzle = window.PicturePuzzle || PicturePuzzle;
