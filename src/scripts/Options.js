function createBoardSizeEl() {
  const boardSizeEl = `
  <input 
    class="board_size" 
    type="text" 
    value="3"
    maxlength="20"
    size="20"
    spellcheck="false"
  >
  `;

  return boardSizeEl;
}

function createNewGame() {
  const newGameBtn = `
  <button 
    class="btn btn--start" 
    type="submit">
    Start game
  </button>
  `;
  return newGameBtn;
}

export { createBoardSizeEl, createNewGame };
