export default function createTemplate() {
  const TEMPLATE = `
    <div id="puzzle-wrapper" class="wrapper">
    <div class="options-block">
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
      <div class="number-toggle-block">
        <div class="number-toggle txt">Turn on/off numbers</div>
      </div>
      <div class="btns">
        <button 
          class="btn btn--start" 
          type="submit"
          for="size">
          New game
        </button>
        <button 
          class="btn btn--next" 
          type="button">
          Show me more!
        </button>
      </div>

      <div class="counts">
        <div 
          class="move-count txt">
          Steps: <span class="moves">0</span>
        </div>
        <div class="time-count txt">
          Time: <span class="time"><span class="min">00</span>:<span class="sec">00</span></span>
        </div>
      </div>

    </div>
  </div>
  `;
  return TEMPLATE;
}
