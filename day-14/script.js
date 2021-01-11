// variable reassignment (numbers, strings, etc...)
    // let age = 100;
    // let age2 = age;
    // console.log(age, age2); // logged: 100 100
    // age = 200;
    // console.log(age, age2); // logged 200 100

    // let name = 'Wes';
    // let name2 = name;
    // console.log(name, name2); // logged: Wes Wes
    // name = 'wesley';
    // console.log(name, name2); // logged:  wesley Wes


// ARRAYS --------------------
// Let's say we have an array & we want to make a copy of it
const players = ['Tenal', 'Sarah', 'Ryan', 'Poppy'];
const team = players;
console.log('players & team arrays:', players, team);


// You might think we can just reassign a value in the team array without impacting the original players array... 
// However, this edits the original array too! Why? Because it's an ARRAY REFERENCE, not an array copy. They both point to the same array!
team[3] = 'Lux';
console.log('players & team arrays after replacing one value in the team array only (spoiler alert: it didn\'t work because team is a reference!):', players, team);


// So, how do we fix this and actually make a an ARRAY COPY? 
    // (1) take a copy
const team2 = players.slice();
    // (2) create a new array and concat the old one in
const team3 = [].concat(players);
    // (3) use the new ES6 Spread
const team4 = [...players];
    // (4) use Array.from()
const team5 = Array.from(players);


// Now let's try replacing one value (now when we update it, the original one isn't changed)
team4[3] = 'JADEN';
console.log('players & team4 arrays after replacing one value in the team4 array only (it works because team4 is a copy!):', players, team4);




// OBJECTS --------------------
// The same thing goes for objects, let's say we have a person object & we want to make a copy
const person = {
    name: 'Tenal Bourchier',
    age: 80
};
console.log('our original person object:', person);


// This will NOT work (once again, it's a REFERENCE & will impact the original object too!)
    // const captain = person;
    // captain.number = 99;


// So, how do we take a COPY instead?
    // (1) Object.assign() starts with a blank object, you pass it the object you wish to copy from, and then 'fold' in new properties you want to overwrite
const captain2 = Object.assign({}, person, { likes: 'cats & coding', age: 12 });
    // (2) object spread
const captain3 = { ...person };


// Now let's see if our replacement values updated the original object (now when we update it, the original one isn't changed)
console.log('our updated copy of the person object (captain2):', captain2);
console.log('our unchanged original person object:', person);


// IMPORTANT --------------------
// NOTE: this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
const tenal = {
    name: 'Tenal',
    age: 100,
    social: {
        twitter: '@TenalInTech',
        portfolio: 'tenalbourchier.com'
    }
};


// Let's make a copy of this and update a value in social (OH NO! it updates the original object despite being a copy!)
    // console.log(tenal);
    // const dev = Object.assign({}, tenal);
    // dev.social.twitter = '@randomTwitterName';
    // console.log(tenal.social, dev.social)


// while a deep clone function is better, the 'cheap mans' way of making a nested copy is:
    // const dev2 = JSON.parse(JSON.stringify(tenal));