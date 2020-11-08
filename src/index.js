// variables
let board;
let zx;
let zy;
let clicks;
let possibles;
let clickCounter;
let oldzx = -1;
let oldzy = -1;

// проверка хода
function getPossibles() {
  let ii;
  let jj;
  const cx = [-1, 0, 1, 0];
  const cy = [0, -1, 0, 1];
  possibles = [];
  for (let i = 0; i < 4; i += 1) {
    ii = zx + cx[i];
    jj = zy + cy[i];
    if (ii < 0 || ii > 3 || jj < 0 || jj > 3) continue;
    possibles.push({ x: ii, y: jj });
  }
  console.log(`after${possibles}`);
}

// контент и перемещение ячеек
function updateBtns() {
  let cellById;
  let cellNumber;
  let id;
  for (let j = 0; j < 4; j += 1) {
    for (let i = 0; i < 4; i += 1) {
      id = `cell${i + j * 4}`;
      cellById = document.getElementById(id);
      cellNumber = board[i][j];
      if (cellNumber < 16) {
        cellById.innerHTML = (`${cellNumber}`);
        cellById.className = 'cell';
      } else {
        cellById.innerHTML = ('');
        cellById.className = 'empty';
      }
    }
  }
  clickCounter.innerHTML = `Ходов: ${clicks}`;
}

function mixing() {
  let t;
  // permutation - количество перестановок
  for (let permutation = 0; permutation < 2; permutation += 1) {
    getPossibles();
    t = possibles[Math.floor(Math.random() * possibles.length)];
    while (t.x === oldzx || t.y === oldzy) {
      t = possibles[Math.floor(Math.random() * possibles.length)];
      // console.log(t.x, oldzx, t.y, oldzy);
    }
    oldzx = zx;
    oldzy = zy;
    board[zx][zy] = board[t.x][t.y];
    zx = t.x;
    zy = t.y;
    board[zx][zy] = 16;
  }
}

function restart() {
  mixing();
  clicks = 0;
  updateBtns();
}
function checkFinished() {
  let a = 0;
  for (let j = 0; j < 4; j += 1) {
    for (let i = 0; i < 4; i += 1) {
      if (board[i][j] < a) return false;
      a = board[i][j];
    }
  }
  return true;
}
function btnHandle(e) {
  getPossibles();
  const c = e.target.i;
  const r = e.target.j;
  let p = -1;
  for (let i = 0; i < possibles.length; i += 1) {
    if (possibles[i].x === c && possibles[i].y === r) {
      p = i;
      break;
    }
  }
  if (p > -1) {
    clicks += 1;
    const t = possibles[p];
    board[zx][zy] = board[t.x][t.y];
    zx = t.x; zy = t.y;
    board[zx][zy] = 16;
    updateBtns();
    // выиграл?
    if (checkFinished()) {
      setTimeout(() => {
        console.log('ай! маладэц!');
        restart();
      }, 1);
    }
  }
}

// функция создания доски (по умолчания - размер 4*4)
function createBoard(boardSize = 4) {
  board = new Array(boardSize);
  // создаём колонки + изначальное заполнение
  for (let i = 0; i < boardSize; i += 1) {
    board[i] = new Array(boardSize);
  }
  for (let j = 0; j < boardSize; j += 1) {
    for (let i = 0; i < boardSize; i += 1) {
      board[i][j] = (i + j * boardSize) + 1;
    }
  }
  zx = 3;
  zy = 3;
  board[zx][zy] = 16;
}
function createBtns(boardSize = 4) {
  let cellEl;
  const boardEl = document.createElement('div');
  boardEl.className += 'board';
  document.body.appendChild(boardEl);
  for (let j = 0; j < boardSize; j += 1) {
    for (let i = 0; i < boardSize; i += 1) {
      // тут создаём костяшки
      cellEl = document.createElement('div');
      cellEl.id = `cell${i + j * boardSize}`;
      cellEl.i = i;
      cellEl.j = j;
      cellEl.addEventListener('click', btnHandle, false);
      cellEl.appendChild(document.createTextNode(''));
      boardEl.appendChild(cellEl);
    }
  }
  // тексты, рекорды, счётчик и тд
  clickCounter = document.createElement('p');
  clickCounter.className += 'txt';
  document.body.appendChild(clickCounter);
}
// начало игры, обновление и тд
function start() {
  createBtns();
  createBoard();
  restart();
}

// run
window.onload = start();
