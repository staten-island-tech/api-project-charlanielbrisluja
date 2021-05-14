import { DOMSelectors } from "./DOM";

window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = '';
  });


/*
 DOMSelectors.addButton.addEventListener('click', function () { 
if (DOMSelectors.addButton.innerHTML = "Delete monster") {
DOMSelectors.cardBox.appendChild(DOMSelectors.monsterCard);
DOMSelectors.addButton.innerHTML = "Add monster";
DOMSelectors.addButton.style.backgroundColor = "var(--yellow-color)";  
} else {
DOMSelectors.selectedBox.appendChild(DOMSelectors.monsterCard);
DOMSelectors.addButton.innerHTML = "Delete monster";
DOMSelectors.addButton.style.backgroundColor = "var(--red-color)";
DOMSelectors.addButton.style.boxShadow = "none";    
}
});
*/

DOMSelectors.moreButton.addEventListener("click", function () {
if (DOMSelectors.moreButton.innerHTML === "More space") {
    DOMSelectors.storyArea.style.minHeight = "100rem";
    DOMSelectors.moreButton.innerHTML = "Less space";
} else {
    DOMSelectors.storyArea.style.minHeight = "50rem";
    DOMSelectors.moreButton.innerHTML = "More space";
}
});

  const query = async function() {
    try {
        const response = await fetch('https://www.dnd5eapi.co/api/monsters');
        const data = await response.json();
        data.results.forEach((monster) => {
            DOMSelectors.cardBox.insertAdjacentHTML ("beforeend", `<div class="monster-card">
            <h2 class="name">${monster.name}</h2>
            <div class="monster-info">
            <h3 class="monster-description">Search for this monster above to find more information!</h3>
            </div>
            <button class="addbtn">Add monster</button>
            <button class="learnbtn">Learn more</button>
      </div>
    </div>`);
        });
    } catch (error) {
        console.log(error);
        alert("Something went wrong. Try again later.");
    }
}
query(); 

DOMSelectors.resetButton.addEventListener("click", function () {
    query();
    DOMSelectors.searchBox.value = "";
});
const search = function () {
    DOMSelectors.searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      DOMSelectors.cardBox.innerHTML = "";
      const searchWords = DOMSelectors.searchBox.value.replace(/\s+/g, '-').toLowerCase();
      const searchQuery = async function() {
          try {
              const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${searchWords}`);
              const data = await response.json();
              if (data.hasOwnProperty('error')) {
                alert("No monster found. Check for spelling errors.");
                query();
              }
                DOMSelectors.cardBox.insertAdjacentHTML ("beforeend", `<div class="monster-card">
                  <h2 class="name">${data.name}</h2>
                  <div class="monster-info">
                  <h3 class="monster-description">Size: ${data.size}</h3>
                  <h3 class="monster-description">Type: ${data.type}</h3>
                  <h3 class="monster-description">Subtype: ${data.subtype}</h3>
                  <h3 class="monster-description">Alignment: ${data.alignment}</h3>
                  <div class="stats-grid">
                  <h3>AC: ${data.armor_class}</h3>
                  <h3>HP: ${data.hit_points}</h3>
                  </div>
                  </div>
                  <button class="addbtn">Add monster</button>
                  <button class="learnbtn">Learn more</button>
                  </div>
                  </div>`);
               }
               catch (error) {
                  console.log(error);
                  alert("No monster found. Check for spelling errors.");
                  query();
              }
      };
      searchQuery(); 
      
    });
  };
  search();
/*
const stats = async function() {
    try {
        const results = await fetch(`https://www.dnd5eapi.co/api/monsters/${monster.index}`);
        const info = await results.json();
        info.results.forEach((monster) => {
        DOMSelectors.cardBox.insertAdjacentHTML ("beforeend", `<div class="monster-card">
        <h2 class="name">${monster.name}</h2>
        <div class="monster-info">
        <h3 class="type">Type: ${monster.type}</h3>
        <h3 class="size">Size: ${monster.size}</h3>
        <div class="stats-grid">
        <h3>AC: ${monster.armor_class}</h3>
        <h3>HP: ${monster.hit_points}</h3>
        <h3>CR: 2</h3>
        <h3>XP: 450</h3> 
        </div>
        </div>
        <button class="addbtn">Add monster</button>
        <button class="learnbtn">Learn more</button>
  </div>
</div>`
);
});
} catch (error) {
console.log(error);
alert("Something went wrong.");
}
}
*/
//console.log(DOMSelectors.cardBox.children);
console.log(DOMSelectors.selectedBox.childElementCount);
DOMSelectors.cardBox.addEventListener("click", function (e) {
console.log(DOMSelectors.selectedBox.childElementCount);
    //makes sure that target is the add button
    if (e.target.innerHTML === "Add monster") {
        //no more empty state
        DOMSelectors.emptyIcon.style.display = "none";
        //changes the original button to prepare for copying
        e.target.innerHTML = "Delete monster";
        e.target.style.backgroundColor = "var(--red-color)";
        //copies and appends the element
        const newCard = document.createElement("div");
        newCard.insertAdjacentHTML ("beforeend", e.target.parentElement.outerHTML);
    DOMSelectors.selectedBox.append(newCard);
    //reverts the original button
    e.target.innerHTML = "Add monster";
    e.target.style.backgroundColor = "var(--yellow-color)";
//DOMSelectors.selectedBox.insertAdjacentHTML('beforeend', copy);
}});

DOMSelectors.selectedBox.addEventListener("click", function (e) {
    if (e.target.innerHTML === "Delete monster") {
        e.target.parentElement.style.display = "none";
//DOMSelectors.selectedBox.insertAdjacentHTML('beforeend', copy);
}});


/*
DOMSelectors.cardBox.childNodes.forEach((card) => {
    card.addEventListener("click", function (card) {
DOMSelectors.selectedBox.appendChild(card);
button.innerHTML = "Delete monster";
button.style.backgroundColor = "var(--red-color)";
button.style.boxShadow = "none";  
    });
    console.log("button");
});

// buttonArray.forEach((button) => {
// card.querySelector(".addbtn").addEventListener('click', function (e) { 
//     console.log("yes");
// });
// });

*/
