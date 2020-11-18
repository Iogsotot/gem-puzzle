export default class Cell {
  constructor(puzzle, index) {
    this.isEmpty = false;
    this.index = index;
    this.puzzle = puzzle;
    this.width = this.puzzle.width / this.puzzle.boardSize;
    this.height = this.puzzle.height / this.puzzle.boardSize;
    // maxCell = empty cell
    this.maxCell = this.puzzle.boardSize * this.puzzle.boardSize - 1;
    this.el = this.createDiv();
    puzzle.el.appendChild(this.el);

    if (this.index === this.maxCell) {
      this.isEmpty = true;
      return;
    }
    this.setImage();
    this.setPosition(this.index);
  }

  createDiv() {
    const div = document.createElement('div');
    div.classList.add('cell');
    // set number to cell
    if (this.index !== this.maxCell) div.innerHTML = `${this.index + 1}`;
    //
    div.style.backgroundSize = `${this.puzzle.width / 10}rem ${this.puzzle.height / 10}rem`;
    div.style.position = 'absolute';
    div.style.width = `${this.width / 10 - 0.5}rem`;
    div.style.height = `${this.height / 10 - 0.5}rem`;
    div.style.lineHeight = `${this.height / 10 - 0.5}rem`;
    div.style.fontSize = `${this.height / 30}rem`;

    div.onclick = () => {
      const currentCellIndex = this.puzzle.findPosition(this.index);
      const emptyCellIndex = this.puzzle.findEmpty();
      const { x, y } = this.getXY(currentCellIndex);
      const { x: emptyX, y: emptyY } = this.getXY(emptyCellIndex);

      if ((x === emptyX || y === emptyY)
        && (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)) {
        // console.log("I can swap");
        this.puzzle.moveCount += 1;
        if (this.puzzle.onSwap && typeof this.puzzle.onSwap === 'function') {
          this.puzzle.onSwap(this.puzzle.moveCount);
        }
        this.puzzle.swapCells(currentCellIndex, emptyCellIndex, true);
      }
    };

    return div;
  }

  setImage() {
    const { x, y } = this.getXY(this.index);
    const left = this.width * x;
    const top = this.height * y;
    this.el.style.backgroundImage = `url(${this.puzzle.imageSrc})`;
    this.el.style.backgroundPosition = `-${left / 10}rem -${top / 10}rem`;
  }

  setPosition(index) {
    const { left, top } = this.getPositionFromIndex(index);

    this.el.style.left = `${left / 10}rem`;
    this.el.style.top = `${top / 10}rem`;
  }

  getPositionFromIndex(index) {
    const { x, y } = this.getXY(index);
    return {
      left: this.width * x,
      top: this.height * y,
    };
  }

  getXY(index) {
    return {
      x: index % this.puzzle.boardSize,
      y: Math.floor(index / this.puzzle.boardSize),
    };
  }
}
