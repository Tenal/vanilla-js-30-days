const panels = document.querySelectorAll('.panel');

// function to animate the image & main paragraph
function toggleOpen() {
    this.classList.toggle('open');
}

// function to animate secondary paragraphs
function toggleActive(e) {
    // if you console.log(e.propertyName) you'll see that we're transitioning 2 things here: flex & font-size, but we only care about flex here so specify this (NOTE: usually you would write this as e.propertyName === 'flex-grow', however this doesn't work on Safari so instead we'll use includes('flex'))
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}

// loop over each panel returned in a node list & listen for when each panel is clicked, then run the function that animates the image & main paragraph
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
// once the animation above is complete (the transition has ended = transitionend), then run the function that animates the secondary paragraphs
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));