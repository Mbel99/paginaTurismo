// get elements from DOM
const btns = document.querySelectorAll(".list");
const  items = document.querySelectorAll(".grid-item");

// Add a click event to all buttons
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener(`click`,filterItems);
}

// Set active button on click
function setActBtn(e) {
    // Remove active class from all buttons
    btns.forEach(btn => {
        btn.classList.remove('active');
    });
    // Add active class to clicked button
    e.target.classList.add('active');
}

// Filter items
function filterItems(e) {
    // Run active button function
    setActBtn(e)
    // Loop through all items
    items.forEach(item => {
        // Show all items
        item.style.display="block";
        // Get data from data atributes
        // Get item type data
        const itemType = parseInt(item.dataset.item);
        // Get button type data
        const btnType = parseInt(e.target.dataset.btn);
        //If the item type and the type of clicked button are NOT the same
        if(itemType !== btnType){
            // Hide item
            item.style.display="none";
        };
        });
};

// Set click event for the "Todos" button
btns[0].addEventListener(`click`, (e) => {
    // Run the active button function
    setActBtn(e);
    // Loop through all items
    items.forEach(item => {
        // Show all items
        item.style.display="block";
    });
});