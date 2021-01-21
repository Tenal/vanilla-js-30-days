const triggers = document.querySelectorAll('a');
// create a 'highlight' element & put it directly into the DOM
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.appendChild(highlight);


// highlight links by 'following'
function highlightLink() {
    // get the coordinates of the link (getBoundingClientRect() is a method on DOM)
    const linkCoords = this.getBoundingClientRect();
        // console.log(linkCoords);
    
    // calculate how far user has scrolled down the page and add that to the coordinates of the hovered link (this avoids the highlight span by appearing 'off' [ie higher or lower than the link] by the amount a user has scrolled down or up the page)
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX // just in case there's horizontal scroll
    };

    // update the style of the highlight span depending on width/height of link user hovers over
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    // make the highlight span transform from the previously hovered link to the currently hovered link
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}


// highlight the link as user's mouse moves over a link
triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));