// grab all the elements that have a data-time attribute & convert the Node list that return into an Array
const timeNodes = Array.from(document.querySelectorAll('[data-time'));

console.log('time for each video is contained in the data-time attribute on the list item:', timeNodes)


// calculate the total number of seconds in all videos
const seconds = timeNodes
    // create a new array consisting of the the values from each data-time attribute
    .map(node => node.dataset.time)
    // separate each time value into two separate values (minutes & seconds), convert them from strings to integers, and add up the total seconds for each index
    .map(timeCode => {
        const [mins, secs] = timeCode.split(':').map(parseFloat);
        return (mins * 60) + secs;
    })
    // reduce the array into a single value by adding the seconds at each index together (to get a 'total')
    .reduce((vidTotal, vidSeconds) => {
        return vidTotal + vidSeconds
    });

console.log('total seconds:', seconds)


// convert total seconds into HH:MM:SS
let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log('TOTAL TIME (HH MM SS):', hours, mins, secondsLeft);