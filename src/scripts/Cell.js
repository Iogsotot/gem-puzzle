export default class Cell {
  constructor(puzzle, index) {
    this.index = index;
    this.puzzle = puzzle;
    this.el = this.createDiv();

    puzzle.el.appendChild(this.el);
  }

  createDiv() {
    const div = document.createElement('div');
    div.classList.add('cell');
    
    div.innerHTML = `${this.index + 1}`;
    const blockWidth = this.puzzle.width / this.puzzle.boardSize;
    const blockHeight = this.puzzle.height / this.puzzle.boardSize;
    const left = blockWidth * (this.index % this.puzzle.boardSize);
    const top = blockHeight * (Math.floor(this.index / this.puzzle.boardSize));
    
    div.style.backgroundImage = `url(${this.puzzle.imageSrc})`;
    div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
    div.style.position = 'absolute';
    div.style.width = `${blockWidth}px`;
    div.style.height = `${blockHeight}px`;
    div.style.border = '4px solid wheat';

    div.style.left = `${left}px`;
    div.style.top = `${top}px`;

    div.style.backgroundPosition = `-${left}px -${top}px`;

    return div;
  }
}
