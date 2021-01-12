const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 100; // px

// function that causes the shadow to change based on mouse movement
function shadow(e) {
    // destructure width & height properties from div with a class of hero
    const { offsetWidth: width, offsetHeight: height } = hero;
    // destructure x and y position properties of mouse
    let { offsetX: x, offsetY: y } = e;

    // if you console.log(x, y) you'll notice that the coordinates when you hover over the h1 change drastically - why? because the offsetX/Y properties on the event are in relation to each element on the page. therefore, to normalize this, do the following (NOTE: 'this' will always be .hero bc that's where the event listener is; e.target will change depending on whether your mouse is on the h1 or just the regular .hero):
    // if the value of this (.hero) and e.target (either .hero or h1) are NOT the same (ie: if e.target is h1), then change the values of x & y so that they provide values relative to .hero
    if (this !== e.target) {
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    // 'walk' is how many pixels, at most, the shadow should stretch (as 100 is our walk, 50 is as high as we go and -50 is as low as we'll go... so the following offsets to ensure the range is -50 to 50 instead of 0 to 100):
    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    // the shadow colour & offset
    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(0, 0, 0, 0.377),
        ${xWalk * -1}px ${yWalk}px 0 rgba(255, 255, 255, 0.377),
        ${yWalk}px ${xWalk * -1 }px 0 rgba(255, 165, 113, 0.637),
        ${yWalk * -1}px ${xWalk}px 0 rgba(255, 244, 149, 0.863)
    `;
}

hero.addEventListener('mousemove', shadow);