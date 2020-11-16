// import clickCount from '';
// import totalTime from '';

const totalTime = 10;
const clickCount = 12;

export default function addPopup() {
  const popup = `
  <div class="popup_wrapper">
    <div class="popup">
      <div class"icon--close">close</div>
      Congratulation! You are winner!
      <div>Your time: ${totalTime}s</div>
      <div>Steps: ${clickCount}</div>  
    </div>
  </div>  
  `;
  document.body.innerHTML += popup;
}
