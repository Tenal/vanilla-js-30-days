const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// resizing canvas to fit browser window
canvas.width = ((window.innerWidth) - 33);
canvas.height = ((window.innerHeight) - 80);

// defining paint brush/stroke styles
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 15;

// defining global variables
let isDrawing = false; // when the user clicks down on a mouse/keypad we will set this to true, when they release we will set this back to false
let lastX = 0; // to draw a line, you need the X & Y coordinates of where it starts + ends
let lastY = 0;
let hue = 0;
let direction = true;


// a function that draws the users mouse mouth & defines its style (colour, width, etc)
function draw(e) {
    // stop the function from running when the user is not clicking down on the mouse
    if (!isDrawing) return;

    // define the colour of the stroke path (note: hue of 0 is red)
    ctx.strokeStyle = `hsl(${hue}, 85%, 60%)`;

    // the beginPath() method is a predefined HTML canvas method & begins a path, or resets the current path
    ctx.beginPath();
    // start path from:
    ctx.moveTo(lastX, lastY);
    // end path at (e.offsetX/Y are properties found on the event):
    ctx.lineTo(e.offsetX, e.offsetY);
    // draw the path:
    ctx.stroke();
    // update the lastX/Y variables so they don't continue to reset to 0
    [lastX, lastY] = [e.offsetX, e.offsetY];

    // increment the hue continuously (thus crating a rainbow-esque' appearance to the stroke path)
    hue++;
    // once the hue reaches 360, reset it to 0 (not noticeable as this sets it from red to red, but keeps the number from incrementing outrageously high)
    if (hue >= 360) {
        hue = 0;
    }

    // make the line width fluctuate as the user draws (between 11 to 25 px) by toggling between direction being true and false
    if (ctx.lineWidth >= 25 || ctx.lineWidth <= 11) {
        direction = !direction;
    }
    // increase line width if direction is true, else decrease line width
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}


// listen for if the user clicks down on the mouse, then make 'isDrawing' true & update the lastX/Y variables to where the user is currently clicking
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
// listen for when the user moves their mouse around the canvas, then fire the draw function
canvas.addEventListener('mousemove', draw);
// listen for if the user stops clicking on the mouse, then make 'isDrawing' false
canvas.addEventListener('mouseup', () => isDrawing = false);
// if mouse leaves the canvas then make 'isDrawing' false (because if a user stops clicking on the mouse after they leave the confines of the canvas, then they move their mouse back onto the canvas it will continue drawing because they never triggered the 'mouseup' event listener above)
canvas.addEventListener('mouseout', () => isDrawing = false);