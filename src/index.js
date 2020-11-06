// variables
let board;
let zx;
let zy;
let clicks;
let possibles;
let clickCounter;
let oldzx = -1;
let oldzy = -1;

// проверка решаемости
function getPossibles() {
  let ii; let jj; const cx = [-1, 0, 1, 0]; const
    cy = [0, -1, 0, 1];
  possibles = [];
  for (let i = 0; i < 4; i += 1) {
    ii = zx + cx[i]; jj = zy + cy[i];
    if (ii < 0 || ii > 3 || jj < 0 || jj > 3) continue;
    possibles.push({ x: ii, y: jj });
  }
}

// randomize
function shuffle() {
  let v = 0; let
    t;
  /* eslint no-constant-condition: ["error", { "checkLoops": false }] */
  do {
    getPossibles();
    while (true) {
      t = possibles[Math.floor(Math.random() * possibles.length)];
      // console.log(t.x, oldzx, t.y, oldzy);
      if (t.x !== oldzx || t.y !== oldzy) break;
    }
    oldzx = zx; oldzy = zy;
    board[zx][zy] = board[t.x][t.y];
    zx = t.x; zy = t.y;
    board[zx][zy] = 16;
  } while (++v < 200);
}
function restart() {
  shuffle();
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
  const c = e.target.i; const r = e.target.j; let
    p = -1;
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
    if (checkFinished()) {
      setTimeout(() => {
        console.log('ай! маладэц!');
        restart();
      }, 1);
    }
  }
}
function createBoard() {
  board = new Array(4);
  for (let i = 0; i < 4; i += 1) {
    board[i] = new Array(4);
  }
  for (let j = 0; j < 4; j += 1) {
    for (let i = 0; i < 4; i += 1) {
      board[i][j] = (i + j * 4) + 1;
    }
  }
  zx = 3;
  zy = 3;
  board[zx][zy] = 16;
}
function createBtns() {
  let b;
  const d = document.createElement('div');
  d.className += 'board';
  document.body.appendChild(d);
  for (let j = 0; j < 4; j += 1) {
    for (let i = 0; i < 4; i += 1) {
      b = document.createElement('button');
      b.id = `btn${i + j * 4}`;
      b.i = i; b.j = j;
      b.addEventListener('click', btnHandle, false);
      b.appendChild(document.createTextNode(''));
      d.appendChild(b);
    }
  }
  clickCounter = document.createElement('p');
  clickCounter.className += 'txt';
  document.body.appendChild(clickCounter);
}
function start() {
  createBtns();
  createBoard();
  restart();
}

// output
function updateBtns() {
  let b; let v; let
    id;
  for (let j = 0; j < 4; j += 1) {
    for (let i = 0; i < 4; i += 1) {
      id = `btn${i + j * 4}`;
      b = document.getElementById(id);
      v = board[i][j];
      if (v < 16) {
        b.innerHTML = (`${v}`);
        b.className = 'button';
      } else {
        b.innerHTML = ('');
        b.className = 'empty';
      }
    }
  }
  clickCounter.innerHTML = `Ходов: ${clicks}`;
}

// run
window.onload = start();
