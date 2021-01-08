const dogs = [{ name: 'Snickers', age: 2 }, { name: 'Hugo', age: 8 }];
const p = document.querySelector('p');

function makeGreen() {
    p.style.color = '#BADA55';
    p.style.fontSize = '50px';
    p.style.padding = '10px';
    p.style.backgroundColor = 'black';
}

// Regular
console.log('Hello, I\'m a regular string!');

// Interpolated
console.log('Hi, I\'m an %s string!', 'interpolated');

// Styled
console.log('%cHola, I\'m some styled text!', 'font-size:20px; color:purple; text-shadow: 1px 1px 1px white;');

// warning!
console.warn('Hey, I\'m a warning!');

// Error :|
console.error('Hallo, I\'m an error!');

// Info
console.info('Bonjour, I\'m some random information!');

// Testing (will only fire if it's WRONG)
console.assert(1 === 2, 'Yo, 1 is clearly equal to 2!');
    // console.assert(p.classList.contains('ouch'), 'That is wrong!');

// clearing
    // console.clear();

// Viewing DOM Elements
console.log('logging an element:', p);
console.dir('logging the directory of an element:', p);

// Table
console.table(dogs);

// Grouping together
dogs.forEach(dog => {
    console.groupCollapsed(`Grouping ${dog.name}'s info:`);
    console.log(`This is ${dog.name}`);
    console.log(`${dog.name} is ${dog.age} years old`);
    console.log(`${dog.name} is ${dog.age * 7} dog years old`);
    console.groupEnd(`Grouping ${dog.name}'s info:`);
});

// counting
console.count('Tenal instance');
console.count('Artmis instance');
console.count('Tenal instance');
console.count('Tenal instance');

// timing
console.time('time to fetch data');
fetch('https://api.github.com/users/wesbos')
    .then(data => data.json())
    .then(data => {
        console.timeEnd('time to fetch data');
        console.log(data);
    });