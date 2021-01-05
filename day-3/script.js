// NOTE: querySelectorAll() returns a node list, on which forEach() can be used
const inputs = document.querySelectorAll('.controls input'); 

function handleUpdate() {
    // dataset is an object that will contain all the data attributes for the specific object ('sizing' is what we called our made-up data attribute; look at HTML for clarification... nothing/'' is used for color input which doesn't have a data-sizing attribute - required to put this otherwise it will return undefined)
    const suffix = this.dataset.sizing || '';
    // select the CSS variable (identified via the name attribute on the inputs in index.html). '+suffix' ensures the 'px' is appended to end of the slider inputs (but not the colour input) 
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

// add an event listener on each of the inputs where, once a value has changed, run the handleUpdate function
inputs.forEach(input => input.addEventListener('change', handleUpdate)); 
// add an event listener on each of the inputs where, once user's mouse moves along slide/color inputs, the handleUpdate function is run (ensures that handleUpdate function isn't only run when user stops sliding the slider, etc)
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
