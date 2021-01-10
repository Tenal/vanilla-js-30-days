const speechBubble = document.querySelector('p');
//array for keys
const pressed = [];
const secretCode = 'tenal';


function key(e) {
    // each time the user hits a key, add its keycode to the 'pressed' array
    pressed.push(e.key);
    // ensure the array is only ever 5 characters (because 'tenal' is the secret code)
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    // if the array (converted into a string with .join()) includes the secret code, 
    if (pressed.join('').includes(secretCode)) {
        cornify_add();
        speechBubble.innerHTML = 'WOW! You guessed the secret code. <a href="https://tenalbourchier.com/" target="_blank" class="speech-link">Click here</a> to learn more about Tenal!'
    }
}


// when use types on their keyboard, run the key function
window.addEventListener('keyup', (e) => key(e));