// audio create element
export default function audio() {
  const audioEl = document.createElement('audio');
  audioEl.setAttribute('autoplay', 'false');
  audioEl.innerHTML = '<source src="./assets/vzz.mp3" type="audio/mpeg">';
  document.body.appendChild(audioEl);
}
