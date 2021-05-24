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
      `The selection of "Monsters" is currently not working. Please try again later.`
    );
  }
};
query();

DOMSelectors.resetButton.addEventListener("click", function () {
  DOMSelectors.cardBox.firstChild.outerHTML = "";
  query();
  DOMSelectors.searchBox.value = "";
});

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const search = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    DOMSelectors.cardBox.innerHTML = "";
    const searchWords = DOMSelectors.searchBox.value
      .replace(".", "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    const searchQuery = async function () {
      try {
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
DOMSelectors.settingCards.addEventListener("click", function (e) {
  if (e.target.innerHTML === "Choose setting") {
    DOMSelectors.settingInput.innerHTML =
      e.target.parentElement.firstChild.nextElementSibling.innerHTML;
  }
  console.log(e.target.parentElement.firstChild.nextElementSibling.innerHTML);
});
// const settingHeader = DOMSelectors.settingHeader;
// console.log(settingHeader[3].textContent);

//characterbox add/delete characters js

DOMSelectors.characterButton.addEventListener("click", function (e) {
  const character = DOMSelectors.character;
  const characterClone = character.cloneNode(true);
  DOMSelectors.characterAndAdd.append(characterClone);
});
DOMSelectors.characterBox.addEventListener("click", function (e) {
  if (e.target.innerHTML === "Delete character") {
    e.target.parentElement.parentElement.outerHTML = "";
  }
  if (DOMSelectors.characterBox.children.length === 3) {
    DOMSelectors.characterAndAdd.insertAdjacentHTML(
      "beforeend",
      `<div class="selected-box">
      <i class="fas fa-helmet-battle"></i>
  </div>`
    );
  }
});

//api stuff for race and class
const race = function () {
  const raceInsert = async function () {
    try {
      const response = await fetch(`https://www.dnd5eapi.co/api/races`);
      const raceData = await response.json();
      raceData.results.forEach((race) => {
        DOMSelectors.raceSelect.insertAdjacentHTML(
          "beforeend",
          `<option value="">${race.name}</option>`
        );
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong! Please try again later.");
    }
  };
  raceInsert();
};
race();

const characterClass = function () {
  const classInsert = async function () {
    try {
      const response = await fetch(`https://www.dnd5eapi.co/api/classes`);
      const classData = await response.json();
      classData.results.forEach((classOption) => {
        DOMSelectors.classSelect.insertAdjacentHTML(
          "beforeend",
          `<option value="">${classOption.name}</option>`
        );
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong! Please try again later.");
    }
  };
  classInsert();
};
characterClass();
