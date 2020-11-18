// import moveCounts from './app.js';
// import totalTime from '';

export default function addPopup(data) {
  const { hours } = data;
  const { mins } = data;
  const { secs } = data;
  const { clickCount } = data;
  const popup = `
  <div class="popup_wrapper">
    <div class="popup">
      <div class="icon--close">close</div>
      <p>Congratulation!</p> 
      <p>You are winner! </p>
      <div class="popup-info">
        <div>Your time: ${hours}:${mins}:${secs}</div>
        <div>Steps: ${clickCount}</div>
      </div>  
    </div>
  </div>  
  `;
  document.body.innerHTML += popup;
}
