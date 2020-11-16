import Cell from './Cell.js';

export default class PicturePuzzle {
  constructor(el, imageSrc, width, size = 3) {
    this.parentEl = el;
    this.boardSize = size;
    this.imageSrc = imageSrc;
    this.width = width;
    this.cells = [];

    this.init();
    const img = new Image();
    img.onload = () => {
      console.log(img.width, img.height);
      this.height = (img.height * this.width) / img.width;
      this.el.style.width = `${this.width}px`;
      this.el.style.height = `${this.height}px`;

      this.setup();
    };
    img.src = this.imageSrc;
  }

  init() {
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
    console.log(this.cells);
  }

  // true shuffle
  shuffle() {
    let j;
    let temp;
    for (let i = this.cells.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.cells[j];
      this.cells[j] = this.cells[i];
      this.cells[i] = temp;
      this.cells[i].setPosition(i);
      this.cells[j].setPosition(j);
    }
    return this.cells;
  }
}
