const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');


navigator.geolocation.watchPosition((data) => { // watch position will get position over time (get current position won't)
    console.log(data);

    // update the user's speed on the browser
    speed.textContent = data.coords.speed;

    // rotate the arrow depending on the direction user is heading
    arrow.style.transform = `rotate(${data.coords.heading}deg)`; // heading gives us the direction the user is heading relative to 'north'
}, (err) => {
    console.error(err);
    alert('Oops! Please allow browser access to your location!')
});