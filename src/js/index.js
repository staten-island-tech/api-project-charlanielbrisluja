import { DOMSelectors } from "./DOM";

window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = '';
  });

  // get url for image:
  //  url(/api/monsters/${index})
  //console.log(https://www.dnd5eapi.co/api/monsters);
  //this is a demo thing 
  DOMSelectors.addButtons.addEventListener('click', function (e) { 
    copy = e.parentElement.cloneNode(true); 
  });
/*
  const query = async function() {
    try {
        const response = await fetch(
        `https://www.dnd5eapi.co/api/monsters`
        );
        const data = await response.json();
        data.results.forEach((monster) => {
            let genreArr = [];
            const addGenre = function () {
                genres.forEach((element) => {
                    if (movie.genre_ids.includes(element.id)) {
                        genreArr.push(element.name);
                        return genreArr;
                    }
                });
            };
            DOMSelectors.cardBox.insertAdjacentHTML("beforeend", `<div class="card-box">
            <div class="monster-card">
            <h2 class="name">${monster.name}</h2>
            <img class="monster-img" src="https://www.dnd5eapi.co/api/monsters/${monster.index}" alt="">`   
        
    )} 
        )} catch (error) {
        console.log(error);
        alert("Something went wrong.")
    }
}
query(); */
/*   DOMSelectors.selectedBox.appendChild(copy);
copy.querySelector('.addbtn').innerHTML = "Delete monster";
copy.querySelector('.addbtn').style.backgroundColor = "var(--red-color)";
copy.querySelector('.addbtn').style.boxShadow = "none";
*/