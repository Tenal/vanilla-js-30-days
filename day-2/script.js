const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date(); // the Date() constructor creates a JavaScript Date instance that represents a single moment in time in a platform-independent format. Date objects contain a Number that represents milliseconds since 1 January 1970 UTC.


    // SECONDS
    const seconds = now.getSeconds(); // getSeconds() returns the seconds, according to local time
    const secondsDegrees = ((seconds / 60) * 360 + 90) // gives us the degree that the seconds hand needs to move each second (90 is added to the end to offset the 90deg in CSS which ensures all hands start at 12)
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`; // tells the second hand to move each second by the specified degree amount

    // to avoid hand moving backwards when transitioning from 444 degrees back to 90 degrees (top) when the seconds go from 59 to 0
    if (secondsDegrees == 90) {
        secondHand.classList.add('no-transition');
    } else {
        secondHand.classList.remove('no-transition');
    }


    // MINUTES
    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360 + 90)
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

    if (minutesDegrees == 90) {
        minuteHand.classList.add('no-transition');
    } else {
        minuteHand.classList.remove('no-transition');
    }


    // HOURS
    const hours = now.getHours();
    const hoursDegrees = ((hours / 12) * 360 + 90)
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

    if (hoursDegrees == 90) {
        hourHand.classList.add('no-transition');
    } else {
        hourHand.classList.remove('no-transition');
    }
}

setInterval(setDate, 1000); // every one second, run the setDate function

setDate();