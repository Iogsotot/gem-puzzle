/* eslint-disable prefer-const */
const boardSize = 4;
const cellMax = boardSize * boardSize;
let board;
let clickCounter = 0;
let cells;
let emptyCellX;
let emptyCellY;
let possibles = [];
let history = [];
let autoWinButtonEl;
// let oldzx = -1;
// let oldzy = -1;

// создаём доску с костяшками на логическом уровне
function createBoard(size = 4) {
  board = new Array(size);
  for (let i = 0; i < board.length; i += 1) {
    board[i] = new Array(size);
  }
  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board.length; x += 1) {
      board[y][x] = (x + y * size) + 1;
    }
  }
}

// проверка хода
function getPossibles() {
  possibles = [];
  // получаем координаты пустой ячейки
  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board.length; x += 1) {
      if (board[y][x] === cellMax) {
        emptyCellX = x;
        emptyCellY = y;
      }
    }
  }
  let px;
  let py;
  const cy = [-1, 0, 1, 0];
  const cx = [0, -1, 0, 1];
  for (let i = 0; i < boardSize; i += 1) {
    px = emptyCellX + cx[i];
    py = emptyCellY + cy[i];
    // eslint-disable-next-line no-continue
    if (px < 0 || px > 3 || py < 0 || py > 3) continue;
    possibles.push({ x: px, y: py });
  }
}

// Отрисовываем html
function createHtml() {
  const boardEl = document.createElement('div');
  boardEl.className += 'board';

  function createCell(cellNumber, cellClass, cellCoords) {
    let cellId;
    let cellX = cellCoords[0];
    let cellY = cellCoords[1];
    if (cellNumber !== '') cellId = cellNumber;
    else cellId = cellMax;
    const cellTemplate = `
    <div class="${cellClass}" id="${cellId}" data-x="${cellX}" data-y="${cellY}">${cellNumber}</div>
    `;
    return cellTemplate;
  }

  document.body.appendChild(boardEl);
  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board.length; x += 1) {
      let cellClass;
      if (board[y][x] < cellMax) cellClass = 'cell';
      else {
        cellClass = 'empty';
      }
      let cellNumber = board[y][x];
      // тут мы создаём пустую ячейку
      if (cellNumber === cellMax) cellNumber = '';
      boardEl.innerHTML += createCell(cellNumber, cellClass, [x, y]);
    }
  }
  // boardEl.addEventListener('click', cellMove);
  const clickCounterEl = `
  <p class="txt">Ходов: ${clickCounter}</p>
  `;
  document.body.innerHTML += clickCounterEl;
  const autoWinButton = `
  <div class="autoWin">Посмотреть решение</div>
  `;
  document.body.innerHTML += autoWinButton;
  autoWinButtonEl = document.querySelector('.autoWin');
  autoWinButtonEl.addEventListener('click', autoWin, false);
}

function btnHandle(e) {
  getPossibles();
  const column = e.target.getAttribute('data-x');
  const row = e.target.getAttribute('data-y');
  let clickedCell = -1;
  console.log(column, row);
  // можно ли передвинуть тыкнутое?
  for (let i = 0; i < possibles.length; i += 1) {
    console.log(possibles[i]);
    if (possibles[i].x.toString() === column && possibles[i].y.toString() === row) {
      clickedCell = i;
      break;
    }
  }
  if (clickedCell > -1) {
    clickCounter += 1;
    const emptyCell = possibles[clickedCell];
    board[emptyCellY][emptyCellX] = board[emptyCell.y][emptyCell.x];
    emptyCellX = emptyCell.x;
    emptyCellY = emptyCell.y;
    board[emptyCellY][emptyCellX] = cellMax;
    updateBoard();
    // выиграл?
    if (checkFinished()) {
      setTimeout(() => {
        console.log('ай! маладэц!');
        restart();
      }, 1);
    }
  }
}

// обновление содержимого (отрисовка вживую)
function updateBoard(size = 4) {
  document.body.innerHTML = null;
  createHtml(size);
  cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('click', btnHandle, false);
  });
}

// перемешиваем костяшки
function cellMixing() {
  let turn;
  // permutation - количество перестановок
  for (let permutation = 0; permutation < 20; permutation += 1) {
    getPossibles();
    turn = possibles[Math.floor(Math.random() * possibles.length)];
    // oldzx = emptyCellX;
    // oldzy = emptyCellY;
    board[emptyCellY][emptyCellX] = board[turn.y][turn.x];
    emptyCellY = turn.y;
    emptyCellX = turn.x;
    board[turn.y][turn.x] = cellMax;
    history.push(turn.x, turn.y);
  }
  updateBoard();
}

// автовыигрыш
function autoWin() {
  console.log(history);
}

// новая игра
function start(size = 4) {
  document.body.innerHTML = null;
  createBoard(size);
  createHtml(size);
  cellMixing();
  // вешаем события на костяшки
  cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('click', btnHandle, false);
  });
}

function restart() {
  history = [];
  cellMixing();
  clickCounter = 0;
  updateBoard();
}

function checkFinished(size = 4) {
  let maxCellValue = 0;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (board[y][x] < maxCellValue) return false;
      maxCellValue = board[y][x];
    }
  }
  return true;
}

// run
window.onload = start(boardSize);
