// import clickCount from '';
// import totalTime from '';

let totalTime = 10;
let clickCount = 12;

export default function addPopup() {
  const popup = `
  <div class="popup">
    <div class"icon--close"></div>
    Congratulation! You are winner!
    <div>Your time: ${totalTime}s</div>
    <div>Steps: ${clickCount}</div>  
  </div>
  `;
  document.body.innerHTML += popup;
}
