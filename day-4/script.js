// Some data to work with
const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = [
    'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
    'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
    'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
    'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
    'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
];


// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
    // could be written in one line: const fifteenHundreds = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));
const fifteenHundreds = inventors.filter((inventor) => {
    if (inventor.year >= 1500 && inventor.year < 1600) {
        return true; // keep the inventor
    }
    // an 'else' with 'return false;' would be redundant (as values that are not truthy will be discarded regardless)
});

console.log('below table depicts inventors born in the 1500\'s (filtered from original array):');
console.table( fifteenHundreds);


// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
    // could be written in one line with TL's: const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
const fullNames = inventors.map((inventor) => {
    return inventor.first + ' ' + inventor.last;
});

console.log('first & last names of inventors (mapped from original array):', fullNames);


// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
    // could be written in one line: const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
const ordered = inventors.sort((firstPerson, secondPerson) => {
    if (firstPerson.year > secondPerson.year) {
        return 1;
    } else {
        return -1;
    }
});

console.log('below table depicts inventors ordered by birthdate (sorted from original array):');
console.table(ordered);


// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
const totalYears = inventors.reduce((total, inventor) => {
    return total + (inventor.passed - inventor.year);
}, 0);

console.log('total number of years all the inventors lived (reduced from original array):', totalYears);


// 5. Sort the inventors by years lived
    // if using ternary instead of conditional: return firstPerson > secondPerson ? -1 : 1;
const oldestToYoungest = inventors.sort((a, b) => {
    const firstPerson = a.passed - a.year;
    const secondPerson = b.passed - b.year;
    if (firstPerson > secondPerson) {
        return -1;
    } else {
        return 1;
    }
});

console.log('below table depicts inventors ordered by age upon death (sorted from original array):');
console.table(oldestToYoungest);


// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
    // select all of the links from the DOM (note: 1) you can call querySelector against the DOM but also against any element! 2) use spread operator or Array.from() to convert node list returned, otherwise array methods will be unable to be applied as information will be returned as a node list (thus only accept 'forEach') instead of an array)
        // const category = document.querySelector('.mw-category');
        // const links = Array.from(category.querySelectorAll('a'));
        // const links = [...category.querySelectorAll('a')];

    // first map to create a new copy of the array, then filter out street names that contain 'de'
        // const de = links
        //             .map(link => link.textContent)
        //             .filter(streetName => streetName.includes('de'));


// 7. sort Exercise
// Sort the people alphabetically by last name
const lastName = people.sort((a, b) => {
    // as the names is an array of string, first separate them so we can target the last name (using split() will produce an array of objects, each object will have two props - first & last name)
        // const separate = a.split(', ');
    // now we want to destructure so they're easier to work with
    const [aLast, aFirst] = a.split(', ');
    const [bLast, bFirst] = b.split(', ');
    
    return aLast > bLast ? 1 : -1;
});

console.log('people sorted alphabetically by last name (sorted & split from original array):', lastName);


// 8. Reduce Exercise
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];

const transportation = data.reduce(function(obj, item) {
    // check for the transportation items & set their initial value to 0
    if (!obj[item]) {
        obj[item] = 0;
    }
    // increment each time
    obj[item]++;
    return obj;
}, {}) // empty the object that we will populate with above info

console.log('summed up instances of each transportation type (reduced from original array):', transportation);