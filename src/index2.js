const boardSize = 4;
const cellMax = boardSize * boardSize;
let board;
const clickCounter = 0;
let cells;
let emptyCellX;
let emptyCellY;
let possibles = [];
const history = [];
let oldzx = -1;
let oldzy = -1;

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
    console.log(emptyCellY, emptyCellX);
    // console.log(px, py);
    if ((px >= 0 || px < 3 || py >= 0 || py < 3) && px < 4 && py < 4) {
      possibles.push({ x: px, y: py });
    }
  }
}



// перемещение по клику
function cellMove() { }



// Отрисовываем html
function createHtml() {
  const boardEl = document.createElement('div');
  boardEl.className += 'board';

  function createCell(cellNumber, cellClass) {
    let cellId;
    if (cellNumber !== '') cellId = cellNumber;
    else cellId = cellMax;
    const cellTemplate = `
    <div class="${cellClass}" id="${cellId}">${cellNumber}</div>
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
  boardEl.addEventListener('click', cellMove);
  const clickCounterEl = `
  <p class="txt">Ходов: ${clickCounter}</p>
  `;
  document.body.innerHTML += clickCounterEl;
}

// обновление содержимого (отрисовка вживую)
function updateBoard() {
  document.body.innerHTML = null;
  createHtml();
}

// перемешиваем костяшки
function cellMixing() {
  let turn;
  // permutation - количество перестановок
  for (let permutation = 0; permutation < 3; permutation += 1) {
    getPossibles();
    turn = possibles[Math.floor(Math.random() * possibles.length)];
    // while (turn.x === oldzx || turn.y === oldzy) {
    //   turn = possibles[Math.floor(Math.random() * possibles.length)];
    // }
    oldzx = emptyCellX;
    oldzy = emptyCellY;
    board[emptyCellX][emptyCellY] = board[turn.x][turn.y];
    emptyCellY = turn.y;
    emptyCellX = turn.x;
    board[turn.x][turn.y] = cellMax;
    history.push(turn.x, turn.y);
  }
  updateBoard();
}

// автовыигрыш
// function autoWin() { 
//  board[emptyCellX][emptyCellY]
// }

// новая игра
function start(size = 4) {
  document.body.innerHTML = null;
  createBoard(size);
  createHtml(size);
  // вешаем события на костяшки
  cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('click', cellMove, false);
  });
}

// run
window.onload = start(boardSize);
