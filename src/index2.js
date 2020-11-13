const boardSize = 4;
const cellMax = boardSize * boardSize;
let board;
const clickCounter = 0;
// let possibles;
// let zx;
// let zy;
// const oldzx = -1;
// const oldzy = -1;

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
// function getPossibles() {
//   let ii;
//   let jj;
//   const cx = [-1, 0, 1, 0];
//   const cy = [0, -1, 0, 1];
//   possibles = [];
//   for (let i = 0; i < 4; i += 1) {
//     ii = zx + cx[i];
//     jj = zy + cy[i];
//     if (ii < 0 || ii > 3 || jj < 0 || jj > 3) continue;
//     possibles.push({ x: ii, y: jj });
//   }
//   // console.log(`after${possibles}`);
// }

// перемещение по клику
// function cellMove(e) {
//   getPossibles();

//   const column = e.target.i;
//   const row = e.target.j;
//   let clickedCell = -1;
//   // можно ли передвинуть в тыкнутое?
//   for (let i = 0; i < possibles.length; i += 1) {
//     if (possibles[i].x === column && possibles[i].y === row) {
//       clickedCell = i;
//       break;
//     }
//   }
//   if (clickedCell > -1) {
//     clicks += 1;
//     const emptyCell = possibles[clickedCell];
//     // console.log(emptyCell);
//     board[zx][zy] = board[emptyCell.x][emptyCell.y];
//     zx = emptyCell.x;
//     zy = emptyCell.y;
//     board[zx][zy] = 16;
//     updateBoard();
//     // выиграл?
//     // if (checkFinished()) {
//     //   setTimeout(() => {
//     //     console.log('ай! маладэц!');
//     //     restart();
//     //   }, 1);
//     // }
//   }
// }

// Отрисовываем html
function createHtml() {
  const boardEl = document.createElement('div');
  boardEl.className += 'board';

  function createCell(cellNumber, cellClass) {
    const cellTemplate = `
    <div class="${cellClass}">${cellNumber}</div>
    `;
    // cellTemplate.addEventListener('click', cellMove, false);
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

      // попытка навесить лисенер на все ячейки
      // boardEl.onclick = function (e) {
      //   const { target } = e;
      //   if (target.tagName !== 'cell') return;
      //   cellMove(target);
      // };
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
