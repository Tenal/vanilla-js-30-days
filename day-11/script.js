// ELEMENTS ----------
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.fullscreen');


// FUNCTIONS ----------

// a function that plays or pauses the video
function togglePlay(){
    // if the video is paused when this function is called, play the video. If the video is playing when this function is called, pause the video.
        // .paused = a property that lives on the video (no play property, only paused).
        // .play() = an HTMLMediaElement method that attempts to begin playback of the media. It returns a Promise which is resolved when playback has been successfully started. Failure to begin playback for any reason, such as permission issues, result in the promise being rejected. (similar for .pause())
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// a function that updates the play/pause button icons
function updateButton() {
    // if the video is paused when this function is called, update the button's icon to 'play'. If the video is playing, update the button's icon to 'pause'.
    const icon = this.paused ? '►' : '❚ ❚'; // use 'this' because it's bound to the video itself
    // grab the 'toggle' button & update its icon
    toggle.textContent = icon;
}

// a function that skips the video forwards/backwards
function skip() {
    // this.dataset returns an object with a skip property that has a string value of either -10 or 25 (depending on the value defined in HTML data-skip attribute), so we can convert that string to an integer & update the current time of the video by adding either -10 or +25 to the time
    video.currentTime += parseFloat(this.dataset.skip);
}

// a function that changes the volume/playback rate
function handleRangeUpdate() {
    // update the 'volume' or 'playback' properties with the value specified by the user
    video[this.name] = this.value;
}

// a function that updates the progress bar as the video plays
function handleProgress() {
    // calculate the percentage of the video that has completed
    const percent = (video.currentTime / video.duration) * 100;
    // update the 'length' of the bar with the percent value
    progressBar.style.flexBasis = `${percent}%`;
}

// a function that moves to the point of the video (& updates the progress bar accordingly) specified by the user via the progress bar
function scrub(e) {
    // calculate the time/point of the video the user wants to go to (find the point where the user clicked along the x-axis/bar, divide that by the total width of the progress bar, then multiply by video duration) 
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    // update the current time of the video with above
    video.currentTime = scrubTime;
}

// a function that makes the video fullscreen
function fullscreen() {
    // NOTE: the Element.requestFullscreen() method issues an asynchronous request to make the element be displayed in full-screen mode.
    video.requestFullscreen();
}


// EVENT LISTENERS ----------

// when the user clicks on the video or play/pause toggle button, run the function that plays/pauses the video
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// when the video is played or paused, run the function that updates the play/pause button accordingly
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// when the time updates on the movie, run the function that updates the current time of the video
video.addEventListener('timeupdate', handleProgress);

// when the user clicks the forward/backward buttons, runt he function that skips the video forwards/backwards
skipButtons.forEach(button => button.addEventListener('click', skip));

// when the user changes either the volume or playback rate range, run the function that updates the progress bar as the video plays
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// when the user clicks or drags on the progress bar, run the function that moves to that time/point in the video
let mousedown = false; // flag variable that is only set to true when the user is clicking down on the mouse
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
    // if users mouse is down (based on variable) then run the function that moves to that time in the video
    if (mousedown) {
        scrub(e)
    }
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// when user clicks on the fullscreen button, run the function that makes the video fullscreen
fullscreenButton.addEventListener('click', fullscreen);