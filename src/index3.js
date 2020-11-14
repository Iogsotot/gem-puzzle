/* eslint-disable prefer-const */
let boardSize = 4;
let cellMax = boardSize * boardSize;
let board;
let clickCounter = 0;
let cells;
let emptyCellX;
let emptyCellY;
let possibles = [];
const possibleDirection = ['left', 'right', 'up', 'down'];
let history = [];
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
  //
  let px;
  let py;
  // const cy = [-1, 0, 1, 0];
  // const cx = [0, -1, 0, 1];
  for (let p = 0; p < possibleDirection.length; p += 1) {
    switch (possibleDirection[p]) {
      case 'left':
        px = emptyCellX - 1;
        py = emptyCellY;
        break;
      case 'right':
        px = emptyCellX + 1;
        py = emptyCellY;
        break;
      case 'up':
        py = emptyCellY - 1;
        px = emptyCellX;
        break;
      case 'down':
        py = emptyCellY + 1;
        px = emptyCellX;
        break;
      default:
    }
    if (px >= 0 && px < board.length && py >= 0 && py < board.length) {
      possibles.push({ x: px, y: py });
    }
  }

  // for (let i = 0; i < boardSize; i += 1) {
  //   px = emptyCellX + cx[i];
  //   py = emptyCellY + cy[i];
  //   console.log(emptyCellY, emptyCellX);
  //   // console.log(px, py);
  //   if ((px >= 0 || px < 3 || py >= 0 || py < 3) && px < 4 && py < 4) {
  //     possibles.push({ x: px, y: py });
  //   }
  // }
}

// вспомогательная функция для правильного рандома
function shuffle(arr) {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    // eslint-disable-next-line no-param-reassign
    arr[j] = arr[i];
    // eslint-disable-next-line no-param-reassign
    arr[i] = temp;
  }
  return arr[0];
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
    // eslint-disable-next-line prefer-const
    let arr = [];
    for (let i = 0; i < possibles.length; i += 1) {
      arr[i] = i;
    }
    console.log("~~~~~~~~~~~~~~ arr")
    console.log(arr);
    turn = possibles[shuffle(arr)];
    console.log("~~~~~~~~~~~~~~ turn")
    console.log(turn);

    board[emptyCellX][emptyCellY] = board[turn.x][turn.y];
    // emptyCellY = turn.y;
    // emptyCellX = turn.x;
    board[turn.x][turn.y] = cellMax;
    history.push(turn.x, turn.y);
    console.log("~~~~~~~~~~~~~~ board")
    console.log(board);
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
