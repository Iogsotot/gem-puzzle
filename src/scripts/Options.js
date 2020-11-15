export default function createBoardSizeEl() {
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
