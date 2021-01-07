const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];

const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];


// Array.prototype.some() 
    // The some() method tests whether at least one element in an array passes the test implemented by the provided function. It returns a Boolean value (thus no need to insert in a conditional with the condition you're testing & returning true if the condition is true - just return the condition you're testing)! 
    // is at least one person 19 or older?
    // shorter way: const isAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);

const isAdult = people.some(function(person) {
    // get the current year so you can calculate the age by subtracting the person's year from it
    const currentYear = (new Date()).getFullYear();
    return currentYear - person.year >= 19;
});

console.log('Is at least one person in the array over 19? (used .some()):', { isAdult });



// Array.prototype.every() 
    // The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value!
    // is everyone 19 or older?
    // shorter way: const isAdult = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);

const allAdults = people.every(function (person) {
    // get the current year so you can calculate the age by subtracting the person's year from it
    const currentYear = (new Date()).getFullYear();
    return currentYear - person.year >= 19;
});

console.log('Is every person in the array over 19? (used .every()):', { allAdults });



// Array.prototype.find()
    // Find is like filter, but instead returns just the one you are looking for. The find() method returns the value of the first element in the provided array that satisfies the provided testing function. If no values satisfies the testing function, undefined is returned.
    // find the comment with the ID of 823423
    // shorter way: const index = comments.findIndex(comment => comment.id === 823423);

const comment = comments.find(function(comment) {
    if (comment.id === 823423) {
        return true;
    }
});

console.log('Is there a comment with an ID of 823423 in the array? (used .find()):', comment);



// Array.prototype.findIndex()
    // The findIndex() method returns the index of the first element in the provided array that satisfies the provided testing function. If no values satisfies the testing function, undefined is returned.

// Find the comment with a specified ID
const index = comments.findIndex(function (comment) {
    if (comment.id === 823423) {
        return true;
    }
});

console.log('What is the index of the comment with an ID of 823423? (used .findIndex()):', index);

// make a new copy of the array, then delete the comment with the ID of 823423 from one of the arrays
const newComments = [
    ...comments.slice(0, index),
    ...comments.slice(index + 1)
];

newComments.splice(index, 1);
console.log('Delete the comment with the above index number from the copied array (using splice()):', newComments);