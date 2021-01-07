// our url endpoint & empty array
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const citiesAndStates = [];


// fetch() returns a promise with the data in an unreadable form, so chaining a then() onto it & applying json() initiates the process of converting it into json format. However, json() returns another promise, so we need to chain one more then() on to receive the array of data in readable/usable json format.
fetch(endpoint)
    .then(rawData => rawData.json())
    .then(data => citiesAndStates.push(...data)); // note: we need to use the spread operator here otherwise we get an array nested with an array if we just push the data into the empty array


// a function that finds cities & states within the array that match the users input
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // determine if the place (city or state) matches what is being searched by:
        // (1) creating a new regexp, passing into it the parameter wordToMatch (which will be the user input) & ensuring it searches globally & is case insensitive
        const regex = new RegExp(wordToMatch, 'gi');
        // (2) pass the above in as a variable to match(), which will then compare it to the city and state listed on each city object within the citiesAndStates array
        return place.city.match(regex) || place.state.match(regex);
    });
}


// a function (from stack overflow) that will convert a number (ie our population) to a format that uses commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


// a function that will display all matches found in the findMatches function every time the user updates the search input
function displayMatches() {
    // pass the user input (this.value) and array to the findMatches function & store the result in a new array of 'matches'
    const arrayOfMatches = findMatches(this.value, citiesAndStates)
    
    // map over the above array & return each place (city or state) in a list element, ensuring to highlight the part of each list item that matches the users search query
    const html = arrayOfMatches.map(place => {
        // replace the user's search input (within each results list item) with a span that will highlight it
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        
        // format each result into a list item
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join(''); // note: join('') is sued to convert this into a string instead of an array (if it's kept as an array, there will be a comma between each city which is not visually appealing)
    
    // replace the innerHTML in the ul with a class of 'suggestions' with the above
    suggestions.innerHTML = html;
}


// select elements on the page that will be used to capture user input & display results
const suggestions = document.querySelector('.suggestions');
const searchInput = document.querySelector('.search');
// add event listeners to the input field, so that each time (a) the input changes (this only fires when user leaves the input field, not each time they type a new letter) or b) a key is finished being pressed (this will fire each time a new letter is added or removed), then the function to display matches is run
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);