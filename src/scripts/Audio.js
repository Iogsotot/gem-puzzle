// audio create element
export default function audio() {
  const audioEl = document.createElement('audio');
  audioEl.innerHTML = '<source src="./assets/vzz.mp3" type="audio/mpeg">';
  audioEl.setAttribute('autoplay', 'false');
  document.body.appendChild(audioEl);
  return audioEl;
}
