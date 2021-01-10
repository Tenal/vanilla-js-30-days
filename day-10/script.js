const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;


// a function that
function handleCheck(e) {
    // a variable that will be used to signify the boxes in between the first and last checked box
    let inBetween = false;
    
    // Check to see if they had the shift key down AND check that they are actually checking the box (ie: ensure they're not unchecking it)
        // NOTE: the 'checked' property sets or returns the checked state of a checkbox
    if (e.shiftKey && this.checked) {
        
        // loop over every single checkbox & look for the first box that was checked and the last box that was checked
        checkboxes.forEach(checkbox => {
            
            // (1) if the box is the first or last box that was checked, then make inBetween the opposite of what it is
                // (a) we need both first & last as a user might check boxes from top to bottom OR bottom to top, but the function will always loop over from 'top' to 'bottom' (first to last), thus we need to ensure that whether the function runs into the first or last checked box first, it still makes inBetween opposite
                // (b) we can't just make inBetween = true, we want to 'turn on' the inBetween variable & specify what to do with it later, otherwise it will become true for ALL checkboxes (instead of flipping between opposites when it hits the first and last checked box)
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
            }

            // (2) if the flag variable is set to true, check that checkbox
            if (inBetween) {
                checkbox.checked = true;
            }
        });
    }

    // make a reference to the last checkbox that was clicked
    lastChecked = this;
}


// loop through the node list of checkboxes returned by query selector all & add an event listener to each checkbox
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', handleCheck);
});