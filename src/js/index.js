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

  const query = async function() {
    try {
        const response = await fetch('https://www.dnd5eapi.co/api/monsters');
        const data = await response.json();
        data.results.forEach((monster) => {
            DOMSelectors.cardBox.insertAdjacentHTML ("beforeend", `<div class="monster-card">
            <h2 class="name">${monster.name}</h2>
            <div class="monster-info">
            <h3 class="type">Type: ${monster.type}</h3>
            <h3 class="size">Size: ${monster.size}</h3>
            <div class="stats-grid">
            <h3>AC: ${monster.armor_class}</h3>
            <h3>HP: ${monster.hit_points}</h3>
            </div>
            </div>
            <button class="addbtn">Add monster</button>
            <button class="learnbtn">Learn more</button>
      </div>
    </div>`);
        });
    } catch (error) {
        console.log(error);
        alert("Something went wrong.");
    }
}
query(); 

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

DOMSelectors.cardBox.addEventListener("click", function (card) {
DOMSelectors.selectedBox.append(card.first);
//DOMSelectors.selectedBox.insertAdjacentHTML('beforeend', copy);
});

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