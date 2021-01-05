function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (!audio) return; // stop function from running altogether if a key is pressed that has no associated audio
    audio.currentTime = 0; // rewind to start so that if key is pressed multiple times, sound will restart & play again instead of waiting for initial audio to finish
    audio.play(); // play the audio/sound associated with the key that was pressed

    key.classList.add('playing'); // when user presses key, add class of 'playing' 
};

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // skip removing the transitioned class (ie stop function from running) if its property name is not transform (bc we have transitions with many property names that we're not interested in, including border-bottom-color, border-left-color, box-shadow, etc)
    this.classList.remove('playing')
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition)); // adding an event listener to the keys so that once the transition (defined in CSS) is complete, apply a function that will remove the transitioned class (we have an array of keys so can't just add event listener, you need to loop through them and add it to each key) NOTE: transitionend = predefined JS event
window.addEventListener('keydown', playSound); // adding an event listener on the window to listen for when the user presses keys, when they do then run the function that plays the sound associated with the key they pressed