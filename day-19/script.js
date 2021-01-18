// selectors
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


// a function that gets the user's video and displays it in the top right corner of the photobooth
function getVideo() {
    // grab the user's video (which will be returned as a promise)
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            // console.log(localMediaStream);

            // take the returned object and store it as a source object (can not just use it as a 'src' attribute as it's not a url)
            video.srcObject = localMediaStream;
            // run the play method on the selected video object
            video.play();
        })
        .catch(error => {
            alert('Uh oh! Please allow the browser to access your webcam.')
        });
}


// a function that applies a set of styles to the users video & periodically (every 16 ms) displays it as the main photo (but appears to be a video) in the photobooth
function paintToCanvas() {
    // get the width & height of the user's video player & update the canvas width/height with those values
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
        console.log(video);
        console.log(width, height)
    
    // every 16 milliseconds, 'draw' the image of the users video on the canvas
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        
        // mess with the pixels
        // 'red' tinted filter:
            // pixels = redEffect(pixels);
        // rgb 'split' filter:
            pixels = rgbSplit(pixels);
        // ghost effect:
            // ctx.globalAlpha = 0.8;
        // green screen filter:
            // pixels = greenScreen(pixels);
        
        // put the pixels back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}


// a function that plays the camera audio & uploads the photo the user has taken to the photo strip beneath the video when the user clicks the 'take photo' button (linked in HTML)
function takePhoto() {
    // play the sound
    snap.currentTime = 0;
    snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'beautiful');
    link.innerHTML = `<img src="${data}" alt="Beautiful Person" />`;
    strip.insertBefore(link, strip.firstChild);
}


// a function that updates the RGB values of the users photo to produce a tinted filter
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // BLUE
    }
    return pixels;
}


// a function that updates the RGB values of the users photo to produce an effect that 'splits' the users photo into overlapping tinted photos
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 300] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 450] = pixels.data[i + 2]; // BLUE
    }
    return pixels;
}


// a function that allows users to add a 'green screen' effect to the photos
function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

// get the user's video & main canvas photo on page load 
getVideo();
video.addEventListener('canplay', paintToCanvas);