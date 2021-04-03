const divs = document.querySelectorAll('div');
const link = document.querySelector('a');

function logText(e) {
    console.log(this.classList.value);
    // e.stopPropagation(); // stop bubbling!
}

divs.forEach(div => div.addEventListener('click', logText, {
    capture: false,
    once: false
}));

link.addEventListener('mouseover', () => {
    console.log('Click me to go back to the homepage!');
}, {
    once: true
});