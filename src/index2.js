const boardSize = 4;
const cellMax = boardSize * boardSize;
let board;
const clickCounter = 0;

// создаём доску с костяшками на логическом уровне
function createBoard(size = 4) {
  board = new Array(size);
  for (let i = 0; i < board.length; i += 1) {
    board[i] = new Array(size);
  }
  for (let j = 0; j < board.length; j += 1) {
    for (let g = 0; g < board.length; g += 1) {
      board[j][g] = (g + j * size) + 1;
    }
  }
}

// Отрисовываем html
function createHtml() {
  const boardEl = document.createElement('div');
  boardEl.className += 'board';

  function createCell(cellNumber, cellClass) {
    const cellTemplate = `
    <div class="${cellClass}">${cellNumber}</div>
    `;
    return cellTemplate;
  }

  document.body.appendChild(boardEl);
  for (let j = 0; j < board.length; j += 1) {
    for (let g = 0; g < board.length; g += 1) {
      let cellClass;
      if (board[j][g] < cellMax) cellClass = 'cell';
      else {
        cellClass = 'empty';
      }
      let cellNumber = board[j][g];
      // тут мы создаём пустую ячейку
      if (cellNumber === cellMax) cellNumber = '';
      boardEl.innerHTML += createCell(cellNumber, cellClass);
    }
  }

  const clickCounterEl = `
  <p class="txt">Ходов: ${clickCounter}</p>
  `;
  document.body.innerHTML += clickCounterEl;
}

// обновление содержимого (отрисовка вживую)
function updateBoard() {
  createHtml();
}

// новая игра
function start(size = 4) {
  document.body.innerHTML = null;
  createBoard(size);
  createHtml(size);
}

// run
window.onload = start(boardSize);
