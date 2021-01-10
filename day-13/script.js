const images = document.querySelectorAll('.slide-in');

// a function that prevents the sliding defined in the slide function from firing too often (this function will run continuously, but it'll only run the function passed into it once every 20 milliseconds)
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// a function that makes the images slide in to view
function slide() {
    // loop over image & determine when image needs to slide in (we're going to make them slide in when user has scrolled to their midpoint)
    images.forEach(image => {
        // calculate the half-way point of each image (gives us the px height when each ofh= the images should slide in)
            // (a) calc the bottom window height: scrollY gives you the px's scrolled from top, so to get the bottom (which is what we need here), just add the window's height
            // (b) subtract half of the image's height from above
        const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
        
        // calculate the bottom of the image (because if we scroll past this, the image should slide back out in case user is scrolling up vs down)
            // (a) offsetTop will tell us how far the top of the image is from top of browser
            // (b) add image height to that to get the bottom of image
        const imageBottom = image.offsetTop + image.height;

        // calculate whether or not the image is half shown or not
        const isHalfShown = slideInAt > image.offsetTop;

        // calculate whether or not we've scrolled all the way past the image
        const isNotScrolledPast = window.scrollY < imageBottom;

        // if the image is half visible & we have not scrolled past it already, then add the CSS class that animates it into view (else, remove this class)
        if (isHalfShown && isNotScrolledPast) {
            image.classList.add('active');
        } else {
            image.classList.remove('active');
        }
    });
}

// when the window scrolls, run the function that allows images to slide in
window.addEventListener('scroll', debounce(slide));