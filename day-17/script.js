const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

// remove the articles from the bands so they don't impact the alphabetization
function removeArticle(bandName) {
    return bandName.replace(/^(a |the |an )/i, '').trim();
}

// sort the bands alphabetically
const sortedBands = bands.sort(function (a, b) {
    if (removeArticle(a) > removeArticle(b)) {
        return 1;
    } else {
        return -1;
    }
});

// display the alphebatized list 
document.querySelector('#bands').innerHTML =
    sortedBands
        .map(band => `<li>${band}</li>`)
        .join('');