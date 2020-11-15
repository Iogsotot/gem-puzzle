import Cell from './Cell.js';

export default class PicturePuzzle {
  constructor(el, imageSrc, width) {
    this.parentEl = el;
    this.boardSize = 3;
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
    div.style.position = 'relative';
    div.style.margin = '0 auto';
    return div;
  }

  setup() {
    for (let i = 0; i < this.boardSize * this.boardSize - 1; i++) {
      this.cells.push(new Cell(this, i));
    }
  }
}
