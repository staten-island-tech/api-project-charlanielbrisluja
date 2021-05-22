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

DOMSelectors.moreButton.addEventListener("click", function () {
  if (DOMSelectors.moreButton.innerHTML === "More space") {
    DOMSelectors.storyArea.style.minHeight = "100rem";
    DOMSelectors.moreButton.innerHTML = "Less space";
  } else {
    DOMSelectors.storyArea.style.minHeight = "50rem";
    DOMSelectors.moreButton.innerHTML = "More space";
  }
});

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
    alert("Something went wrong. Try again later.");
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
                <div class="stats-grid">
                <h3>AC: ${data.armor_class}</h3>
                <h3>HP: ${data.hit_points}</h3>
                </div>
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
                <div class="stats-grid">
                <h3>AC: ${data.armor_class}</h3>
                <h3>HP: ${data.hit_points}</h3>
                </div>
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
    //console.log(newCard.lastChild.lastChild.previousSibling);

    newCard.lastChild.lastChild.previousSibling.addEventListener(
      "click",
      function () {
        //THIS DOESNT WORK FOR SOME REASON???
        //popup();
      }
    );
  }
});
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
          /* BACKUP (IN CASE POPUP DOESNT WORK OUT)
                alert(`
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
                  `);
                  */
        } catch (error) {
          console.log(error);
          alert("Something went wrong. Try again later.");
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
    //     DOMSelectors.monsterBox.innerHTML = "";
  });
};
closePopup();

DOMSelectors.selectedBox.addEventListener("click", function (e) {
  if (e.target.innerHTML === "Delete monster") {
    e.target.parentElement.outerHTML = "";
  }
});

//settingsbox add header and content to boxes
//on click of choose setting button, take settingbox-card-heading and settingbox-card-information and put it in form as text
// const settingHeader = DOMSelectors.settingHeader;
// console.log(settingHeader[3].textContent);
//issues: settingHeader returns a node list of elements, and settingAdd returns an html list of elements. bubbling??event delegation??

//characterbox add/delete characters js

DOMSelectors.characterButton.addEventListener("click", function () {
  const newCharacter = document.createElement("div");
  newCharacter.insertAdjacentHTML(
    "beforeend",
    `<div class="character">
  <div class="name-race-class-level"> 
    <div class="character-labels">
      <p  class="label">Name</p>
      <p class="label">Race</p>
      <p class="label">Class</p>
      <p class="label">Level</p>
    </div>
    <div class="name-and-selects">
  <span class="character-input"role="textbox" contenteditable="true"></span>
  <div class="race-box">
  </div>
  <div class="class-box">
  </div>
    <select class = "dropdown">
       <option  value = "1" selected>1</option>
       <option value = "2">2</option>
       <option value = "3">3</option>
       <option value = "4">4</option>
       <option value = "5">5</option>
       <option value = "6">6</option>
       <option value = "7">7</option>
       <option value = "8">8</option>
       <option value = "9">9</option>
       <option value = "10">10</option>
       <option value = "11">11</option>
       <option value = "12">12</option>
       <option value = "13">13</option>
       <option value = "14">14</option>
       <option value = "15">15</option>
       <option value = "16">16</option>
       <option value = "17">17</option>
       <option value = "18">18</option>
       <option value = "19">19</option>
       <option value = "20">20</option>
    </select>
  </div>
  </div>
  <div class="characterbox-basic-info">
  <p class="label" >Basic information</p>
  <span class="characterbox-writing-section"   role="textbox" contenteditable="true"></span>
  </div>
  <div class="button-box">
  <button class="deletebutton" >Delete character</button>
  </div>
  </div>`
  );
  const character = DOMSelectors.character;
  character.before(newCharacter);
});
DOMSelectors.deleteButton.addEventListener("click", function (e) {
  if (e.target.innerHTML === "Delete character") {
    e.target.parentElement.parentElement.outerHTML = "";
  }
});
// const character = DOMSelectors.character;
// const characterClone = character.cloneNode(true);
// character.before(characterClone);

//api stuff for race and class...there is almost certainly a more effecient way to do this
const race = function () {
  const raceInsert = async function () {
    try {
      const response = await fetch(`https://www.dnd5eapi.co/api/races`);
      const raceData = await response.json();
      DOMSelectors.raceBox.insertAdjacentHTML(
        "beforeend",
        `<select class="dropdown">
        <option value="">${raceData.results[0].name}</option>
        <option value="">${raceData.results[1].name}</option> 
        <option value="">${raceData.results[2].name}</option> 
        <option value="">${raceData.results[3].name}</option>
        <option value="">${raceData.results[4].name}</option>
        <option value="">${raceData.results[5].name}</option>   
        <option value="">${raceData.results[6].name}</option>  
        <option value="">${raceData.results[7].name}</option> 
        <option value="">${raceData.results[8].name}</option>    
      </select>`
      );
    } catch (error) {
      console.log(error);
      alert("Get wrecked loser");
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
      DOMSelectors.classBox.insertAdjacentHTML(
        "beforeend",
        `<select class="dropdown">
        <option value="">${classData.results[0].name}</option>
        <option value="">${classData.results[1].name}</option> 
        <option value="">${classData.results[2].name}</option> 
        <option value="">${classData.results[3].name}</option>
        <option value="">${classData.results[4].name}</option>
        <option value="">${classData.results[5].name}</option>   
        <option value="">${classData.results[6].name}</option>  
        <option value="">${classData.results[7].name}</option> 
        <option value="">${classData.results[8].name}</option>    
        <option value="">${classData.results[9].name}</option>
        <option value="">${classData.results[10].name}</option>
        <option value="">${classData.results[11].name}</option>
      </select>`
      );
    } catch (error) {
      console.log(error);
      alert("Get wrecked loser");
    }
  };
  classInsert();
};
characterClass();
