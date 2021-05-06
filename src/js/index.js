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
      if (DOMSelectors.addButton.innerHTML === "Delete monster") {
        DOMSelectors.cardBox.appendChild(DOMSelectors.monsterCard);
        DOMSelectors.addButton.innerHTML = "Add to my monsters";
        DOMSelectors.addButton.style.backgroundColor = "var(--yellow-color)";
        DOMSelectors.addButton.style.boxShadow = "0 .5rem 1rem rgba(255, 255, 255, .7)";
    } else {
        DOMSelectors.selectedBox.appendChild(DOMSelectors.monsterCard);
        DOMSelectors.addButton.innerHTML = "Delete monster";
        DOMSelectors.addButton.style.backgroundColor = "var(--red-color)";
        DOMSelectors.addButton.style.boxShadow = "0 .5rem 1rem rgba(255, 106, 113, .7)";
      }
  });

