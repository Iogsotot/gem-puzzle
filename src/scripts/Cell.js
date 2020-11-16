export default class Cell {
  constructor(puzzle, index) {
    this.index = index;
    this.puzzle = puzzle;
    this.width = this.puzzle.width / this.puzzle.boardSize;
    this.height = this.puzzle.height / this.puzzle.boardSize;
    //
    this.maxCell = this.puzzle.boardSize * this.puzzle.boardSize - 1;
    this.el = this.createDiv();
    puzzle.el.appendChild(this.el);

    if (this.index === this.maxCell) return;
    this.setImage();
  }

  createDiv() {
    const div = document.createElement('div');
    div.classList.add('cell');
    // set number to cell
    if (this.index !== this.maxCell) div.innerHTML = `${this.index + 1}`;
    //
    // div.style.backgroundImage = `url(${this.puzzle.imageSrc})`;
    div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
    div.style.position = 'absolute';
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.border = '4px solid wheat';

    div.onclick = () => {

    };

    return div;
  }

  setImage() {
    const left = this.width * (this.index % this.puzzle.boardSize);
    const top = this.height * (Math.floor(this.index / this.puzzle.boardSize));
    this.el.style.backgroundImage = `url(${this.puzzle.imageSrc})`;
    this.el.style.backgroundPosition = `-${left}px -${top}px`;
  }

  setPosition(index) {
    const { left, top } = this.getPositionFromIndex(index);

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  getPositionFromIndex(index) {
    return {
      left: this.width * (index % this.puzzle.boardSize),
      top: this.height * (Math.floor(index / this.puzzle.boardSize)),
    };
  }
}
