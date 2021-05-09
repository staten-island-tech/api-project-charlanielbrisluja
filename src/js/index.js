import { DOMSelectors } from "./DOM";

window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = '';
  });

  // get url for image:
  //  url(/api/monsters/${index})

  //this is a demo thing 

  DOMSelectors.addButton.addEventListener('click', function () { 
    let copy = DOMSelectors.monsterCard.cloneNode(true);  
    DOMSelectors.selectedBox.appendChild(copy);
        copy.querySelector('.addbtn').innerHTML = "Delete monster";
        copy.querySelector('.addbtn').style.backgroundColor = "var(--red-color)";
        copy.querySelector('.addbtn').style.boxShadow = "none";
    });

