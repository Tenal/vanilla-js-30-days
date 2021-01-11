const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
// try to get the item list from local storage, if none exists then use an empty array
const items = JSON.parse(localStorage.getItem('items')) || [];


// reformat & add the user's input to our array & local storage
function addItem(e) {
    e.preventDefault();

    // grab user's item (note: 'this' is the form, could have used document instead, but if you had multiple forms 'this' is preferred)
    const text = (this.querySelector('[name=item]')).value;

    // create object for that item
    const item = {
        text, // ES6 shorthand for text: text,
        done: false
    };

    // push new item object into our items array
    items.push(item);

    // call the function that creates a list item for each item
    populateList(items, itemsList);

    // set the items array into local storage (must be stored as a string!)
        // The setItem() method of the Storage interface, when passed a key name and value, will add that key to the given Storage object, or update that key's value if it already exists.
    localStorage.setItem('items', JSON.stringify(items));

    // clear the form input
    this.reset();
}


// create a list item for each item in the array
function populateList(plates = [], platesList) {
    // map will return an array, join will take the array and turn it into a string
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join('');
}


// 
function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}


// event listeners
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);