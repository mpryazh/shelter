"use strict";

// 8 different pets - 8 indexes
let indexes = [...Array(8).keys()];
let currentIndexes = [];
let previousIndexes = [];

// get 3 random indexes (different from previous 3)
function getCurrentIndexes() {
    // out of indexes? add previous 3
    if (indexes.length < 3){
        indexes = indexes.concat(previousIndexes.slice(-3))
    }
    // shuffle aaray of indexes
    shuffle(indexes);
    // take first 3 indexes
    previousIndexes = previousIndexes.concat(currentIndexes);
    currentIndexes = indexes.splice(0,3);

    return currentIndexes;
}

function shuffle(array) {
    // switch every element with a random one
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function getPets(pets) {
    let indexes = getCurrentIndexes();
    let currentPets = [];
    for (let i of indexes) {
        currentPets.push(pets[i]);
    }
    return currentPets;
}
function addInfo(cards, pets) {
    let newPets = getPets(pets);

    cards.forEach(card => {
        let thePet = newPets.pop();
        let cardImg = card.querySelector("img");
        cardImg.setAttribute("src", thePet.img);

        let name = card.querySelector(".name");
        name.innerText = thePet.name;
    });
}


// pets data
fetch('pets.json')
  .then(response => response.json())
  .then(processData)

function processData(data) {
    let pets = []; 
    for (let pet of data) {
        pets.push(pet);
    }

    // put pets info into 3 first cards
    let cards = document.querySelectorAll(".card");
    addInfo(cards, pets);
    

    // slide on click
    let forwardArrow = document.querySelector(".forward-arrow");
    let backArrow = document.querySelector(".back-arrow");
    forwardArrow.addEventListener("click", () => slider("left"));
    backArrow.addEventListener("click", () => slider("right"));


    // copy 3 first cards
    let cardsContainer = document.querySelector("#cards");
    let containerCopy = cardsContainer.cloneNode(true);

    let count = 0; // count moves/slides to one side
    let maxCount = 0;

    const windowSize = window.innerWidth;
    const cardsNumber = windowSize > 1280 ? 3
                        : windowSize > 768 ? 2
                        : 1;

    // change slides 
    function slider(where) {
        if (where == "left") {
            if (!count) {       // change direction on count 0 (no cards on the right)
                cardsContainer.classList.remove("reverse-cards"); 
            };
            leftSlide();
            count++;
        }
        else {
            if (!count) {
                cardsContainer.className += " reverse-cards";
            };
            rightSlide();
            count--;
        }
        
        // add new cards
        let absCount = Math.abs(count);
        let cardsAmount = cardsContainer.children.length;

        if (absCount > maxCount) {
            maxCount = absCount;
            let cardsRequiredAmount = maxCount * cardsNumber + cardsNumber;
            if (cardsRequiredAmount > cardsAmount) {
                let newCards = addCards();
                newCards.forEach(card => {
                cardsContainer.append(card); 
                });
            }
        }
    }

    function addCards() {
        let container = containerCopy.cloneNode(true);
        let newCards = container.querySelectorAll(".card");

        addInfo(newCards, pets);

        return newCards;
    }
  }

// animation
let movable = document.getElementById('cards');
let x = 0;

const cardsStyle = getComputedStyle(movable);
const gap = +cardsStyle.gap.slice(0,-2);
const distance = movable.offsetWidth + gap; // how far to move cards

function leftSlide(){
    animate(-distance);
}
function rightSlide(){
    animate(distance);
}

function animate(distance) {
    movable.animate([
    {transform: `translate(${x}px)`}, 
    {transform: `translate(${x + distance}px)`}],{
    duration: 400,
    iterations: 1,
    fill: 'forwards'
    });
    x += distance;
}


