import { DOMSelectors } from "./DOM";
//NOTES
/*
1. figure out how to close popup
2. figure out how to make popup open on click on learnmore button in selected card

*/
window.addEventListener("beforeunload", function (e) {
  // Cancel the event
  e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
  // Chrome requires returnValue to be set
  e.returnValue = "";
});

// Story section
DOMSelectors.moreButton.addEventListener("click", function () {
  //expands or contracts textarea on click
  if (DOMSelectors.moreButton.innerHTML === "More space") {
    DOMSelectors.storyArea.style.minHeight = "100rem";
    DOMSelectors.moreButton.innerHTML = "Less space";
  } else {
    DOMSelectors.storyArea.style.minHeight = "50rem";
    DOMSelectors.moreButton.innerHTML = "More space";
  }
});

// Monsters section
const query = async function () {
  try {
    //fetches monster name from api
    const response = await fetch("https://www.dnd5eapi.co/api/monsters");
    const data = await response.json();
    data.results.forEach((monster) => {
      DOMSelectors.cardBox.insertAdjacentHTML(
        "beforeend",
        `<div class="monster-card">
            <h2 class="name">${monster.name}</h2>
            <div class="monster-info">
            <h3 class="monster-description">Search for this monster above to find more information!</h3>
            </div>
      </div>
    </div>`
      );
    });
  } catch (error) {
    console.log(error);
    alert(
      `The monster selection is currently not working. Please try again later.`
    );
  }
};
query();

const monsterSelectionReset = function () {
  DOMSelectors.resetButton.addEventListener("click", function () {
  //erases searched monster
  DOMSelectors.cardBox.firstChild.outerHTML = "";
  //resets monster selection
  query();
  //resets search field
  DOMSelectors.searchBox.value = "";
});
};
monsterSelectionReset();

//Capitalizes strings
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const search = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    DOMSelectors.cardBox.innerHTML = "";
    //Replaces periods with spaces, then trims spaces at ends, then replaces spaces with dashes, then makes it lowercase
    const searchWords = DOMSelectors.searchBox.value
      .replace(".", "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    const searchQuery = async function () {
      try {
        //takes search words from the searchbox, puts them through the api, and gets data on that monster
        const response = await fetch(
          `https://www.dnd5eapi.co/api/monsters/${searchWords}`
        );
        const data = await response.json();
        if (data.subtype != null) {
          DOMSelectors.cardBox.insertAdjacentHTML(
            "beforeend",
            `<div class="monster-card">
                <h2 class="name">${data.name}</h2>
                <div class="monster-info">
                <h3 class="monster-description">Size: ${data.size}</h3>
                <h3 class="monster-description">Type: ${data.type.capitalize()}</h3>
                <h3 class="monster-description">Subtype: ${data.subtype.capitalize()}</h3>
                <h3 class="monster-description">Alignment: ${data.alignment.capitalize()}</h3>
                </div>
                <button class="addbtn">Add monster</button>
                <button class="learnbtn">Learn more</button>
                </div>
                </div>`
          );
        } else {
          DOMSelectors.cardBox.insertAdjacentHTML(
            "beforeend",
            `<div class="monster-card">
                <h2 class="name">${data.name}</h2>
                <div class="monster-info">
                <h3 class="monster-description">Size: ${data.size}</h3>
                <h3 class="monster-description">Type: ${data.type.capitalize()}</h3>
                <h3 class="monster-description">Subtype: Null</h3>
                <h3 class="monster-description">Alignment: ${data.alignment.capitalize()}</h3>
               </div>
                <button class="addbtn">Add monster</button>
                <button class="learnbtn">Learn more</button>
                </div>
                </div>`
          );
        }
      } catch (error) {
        console.log(error);
        alert("No monster found. Check for spelling errors.");
        query();
      }
    };
    searchQuery();
  });
};
search();

const addMonster = function () {
  DOMSelectors.cardBox.addEventListener("click", function (e) {
    //makes sure that target is the add button
    if (e.target.innerHTML === "Add monster") {
      //no more empty state
      DOMSelectors.emptyIcon.style.display = "none";
      //changes the original button to prepare for copying
      e.target.innerHTML = "Delete monster";
      e.target.style.backgroundColor = "var(--red-color)";
      e.target.nextElementSibling.style.display = "none";
      //copies and appends the element
      const newCard = document.createElement("div");
      newCard.insertAdjacentHTML("beforeend", e.target.parentElement.outerHTML);
      DOMSelectors.selectedBox.append(newCard);
      //reverts the original button
      e.target.innerHTML = "Add monster";
      e.target.style.backgroundColor = "var(--yellow-color)";
      e.target.nextElementSibling.style.display = "block";
    }
  });
};
addMonster();

const popup = function () {
  DOMSelectors.cardBox.addEventListener("click", function (e) {
    if (e.target.innerHTML === "Learn more") {
      const searchWords = DOMSelectors.searchBox.value
        .replace(".", "")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();
      const learnMore = async function () {
        try {
          const response = await fetch(
            `https://www.dnd5eapi.co/api/monsters/${searchWords}`
          );
          const data = await response.json();
          DOMSelectors.cardBox.insertAdjacentHTML(
            "beforeend",
            `<div class="monster-popup">
                  <h2 class="name">${data.name}</h2>
                  <i class="fas fa-times"></i>
                   <div class="popup-stats">
                    <h3>Size: ${data.size}</h3>
                    <h3>Type: ${data.type.capitalize()}</h3>
                    <h3>Subtype: ${data.subtype}</h3>
                    <h3>Alignment: ${data.alignment.capitalize()}</h3>
                    <h3>Armor Class: ${data.armor_class}</h3>
                    <h3>Hit Points: ${data.hit_points}</h3>
                    <h3>Hit Dice: ${data.hit_dice}</h3> 
                    <h3>Languages: ${data.languages}</h3> 
                    <h3>Challenge Rating: ${data.challenge_rating}</h3>
                    <h3>Experience Points: ${data.xp}</h3> 
                  </div>
                  <div class="popup-abilities">
                    <h3>Strength: ${data.strength}</h3> 
                    <h3>Dexterity: ${data.dexterity}</h3> 
                    <h3>Constitution: ${data.constitution}</h3> 
                    <h3>Intelligence: ${data.intelligence}</h3> 
                    <h3>Wisdom: ${data.wisdom}</h3> 
                    <h3>Charisma: ${data.charisma}</h3> 
                  </div> 
                </div>`
          );
        } catch (error) {
          console.log(error);
          alert("Something went wrong on our end. Try again later.");
        }
      };
      learnMore();
    }
  });
};
popup();

const closePopup = function () {
  DOMSelectors.cardBox.addEventListener("click", function () {
    DOMSelectors.cardBox.lastChild.outerHTML = "";
  });
};
closePopup();

const deleteMonster = function () {
  DOMSelectors.selectedBox.addEventListener("click", function (e) {
    if (e.target.innerHTML === "Delete monster") {
      e.target.parentElement.outerHTML = "";
    }
  });
};
deleteMonster();

//settingsbox add header and content to boxes
const chooseSetting = function () {
  DOMSelectors.settingCards.addEventListener("click", function (e) {
    if (e.target.innerHTML === "Choose setting") {
      DOMSelectors.settingInput.innerHTML =
        e.target.parentElement.firstChild.nextElementSibling.innerHTML;
    }
  });
};
chooseSetting();

//character level insert
const levelArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
levelArray.forEach((level) => {
  DOMSelectors.levelSelect.insertAdjacentHTML(
    "beforeend",
    `<option value="">${level}</option>`
  );
});
//characterbox add/delete characters 
const addCharacter = function () {
  DOMSelectors.characterButton.addEventListener("click", function () {
    //copies and appends original character
    const character = DOMSelectors.character;
    const characterClone = character.cloneNode(true);
    DOMSelectors.characterAndAdd.append(characterClone);
    //erases information in clone from original character
    characterClone.children[0].children[0].children[0].children[1].textContent = "";
    characterClone.children[1].children[1].textContent = "";
  });
}
addCharacter();

const deleteCharacter = function () {
  DOMSelectors.characterBox.addEventListener("click", function (e) {
    if (e.target.innerHTML === "Delete character") {
      e.target.parentElement.parentElement.outerHTML = "";
    }
  });
}
deleteCharacter();

//inserting races and classes from api
  const raceInsert = async function () {
    try {
      const response = await fetch(`https://www.dnd5eapi.co/api/races`);
      const raceData = await response.json();
      raceData.results.forEach((race) => {
        DOMSelectors.raceSelect.insertAdjacentHTML(
          "beforeend",
          `<option class="option" value="race">${race.name}</option>`
        );
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong! Please try again later.");
    }
  };
  raceInsert();

  const classInsert = async function () {
    try {
      const response = await fetch(`https://www.dnd5eapi.co/api/classes`);
      const classData = await response.json();
      classData.results.forEach((classOption) => {
        DOMSelectors.classSelect.insertAdjacentHTML(
          "beforeend",
          `<option value="class">${classOption.name}</option>`
        );
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong! Please try again later.");
    }
  };
  classInsert();
