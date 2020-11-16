function createBoardSizeEl() {
  const boardSizeEl = `
  <input 
    class="board_size"
    id="board-size" 
    type="text" 
    value="4"
    maxlength="2"
    size="3"
    spellcheck="false"
    name="size"
  >
  <label for="board-size" class="board_size__label">Board size</label>
  `;

  return boardSizeEl;
}

function createNewGame() {
  const newGameBtn = `
  <button 
    class="btn btn--start" 
    type="submit"
    for="size">
    New game
  </button>
  `;
  return newGameBtn;
}

function createNextImgBtn() {
  const nextImgBtn = `
  <button 
    class="btn btn--next" 
    type="button">
    Show me more!
  </button>
  `;
  return nextImgBtn;
}

export { createBoardSizeEl, createNewGame, createNextImgBtn };
