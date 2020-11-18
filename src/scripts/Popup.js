// import moveCounts from './app.js';
// import totalTime from '';

const hours = 0;
const mins = 0;
const secs = 0;
const clickCount = 0;

export default function addPopup() {
  const popup = `
  <div class="popup_wrapper">
    <div class="popup">
      <div class"icon--close">close</div>
      Congratulation! You are winner!
      <div>Your time: ${hours}h:${mins}m:${secs}s</div>
      <div>Steps: ${clickCount}</div>  
    </div>
  </div>  
  `;
  document.body.innerHTML += popup;
}
