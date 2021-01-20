// speech recognition is a global variable that lives on top of the window (it might be webkitSpeechRec in Chrome, so just setting both equal to window.SpeechRec)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// as user speaks, ensure words populate during speech instead of after user is finished talking - also set the language property to english
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';


// when user pauses while speaking end the paragraph, start a new paragraph if they begin speaking again
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    // convert the transcript into an array (as user speaks, browser picks up segments of 2-4 words at a time, so we're taking all those segments and converting them into an array so we can loop through), then join segments together into one big string
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    // take the transcript (now a string) and display it in the browser, ensuring that each time the user 'starts' speaking again after a pause, a new paragraph is started
        // //isFinal is a property inside the speach object being returned
    p.textContent = transcript;
    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
    // log emojis in the console when the user says 'hello'
    if (transcript.includes('hello')) {
        console.log('💩💩💩');
    }

    // just for fun:
        // const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
        // p.textContent = poopScript;
});


// when the function ends, run it again
recognition.addEventListener('end', recognition.start);
// run the function on page load
recognition.start();