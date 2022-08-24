"use strict";

// array of pets indexes
let indexes = [...Array(8).keys()];
let currentIndexes = [];
let previousIndexes = [];

// copy 3 initial cards
let cardsContainer = document.querySelector("#cards");
let cardsContainerCopy = cardsContainer.cloneNode(true);

let count = 0; // count moves to one side

const windowSize = window.innerWidth;
const cardsNumber = windowSize >= 1280 ? 3 : windowSize >= 768 ? 2 : 1;

let forwardArrow = document.querySelector(".forward-arrow");
let backArrow = document.querySelector(".back-arrow");

fetch("../pets.json")
  .then((response) => response.json())
  .then(processData);

function processData(data) {
  let pets = [];
  for (let pet of data) {
    pets.push(pet);
  }

  // put pets info into initial cards
  let cards = document.querySelectorAll(".card");
  addInfo(cards, pets);

  // slide on click
  forwardArrow.addEventListener("click", () => slide("forward"));
  forwardArrow.addEventListener("click", addCards);

  backArrow.addEventListener("click", () => slide("back"));
  backArrow.addEventListener("click", addCards);

  function addCards() {
    let cardsAmount = cardsContainer.children.length;
    let cardsRequiredAmount = Math.abs(count) * cardsNumber + cardsNumber;

    if (cardsRequiredAmount > cardsAmount) {
      let container = cardsContainerCopy.cloneNode(true);
      let newCards = container.querySelectorAll(".card");

      addInfo(newCards, pets);
      newCards.forEach((card) => cardsContainer.append(card));
    }
  }
}

function addInfo(cards, pets) {
  let newPets = getPets(pets);

  cards.forEach((card) => {
    let thePet = newPets.pop();
    let cardImg = card.querySelector("img");
    cardImg.setAttribute("src", thePet.img);
    let name = card.querySelector(".name");
    name.innerText = thePet.name;
    // popup event
    card
      .addEventListener("click", (event) => popup(pets, event.target));
  });
}

function getPets(pets) {
  let indexes = getCurrentIndexes(); // 3 random indexes different from previous 3
  let currentPets = [];
  for (let i of indexes) {
    currentPets.push(pets[i]);
  }
  return currentPets;
}

function getCurrentIndexes() {
  if (indexes.length < 3) {
    // add previous indexes back
    indexes = indexes.concat(previousIndexes);
  }

  shuffle(indexes);

  previousIndexes = currentIndexes.slice();
  currentIndexes = indexes.splice(0, 3); // take 3 first indexes

  return currentIndexes;
}

function shuffle(array) {
  // switch every element with a random one
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// animation
function slide(where) {
  if (where == "forward") {
    if (!count) {
      // change direction on count 0 (no cards on the right)
      cardsContainer.classList.remove("reverse-cards");
    }
    leftSlide();
    count++;
  } else {
    if (!count) {
      cardsContainer.className += " reverse-cards";
    }
    rightSlide();
    count--;
  }
}

const movable = document.getElementById("cards");
let x = 0;

const cardsStyle = getComputedStyle(movable);
const gap = +cardsStyle.gap.slice(0, -2);
const distance = movable.offsetWidth + gap; // how far to move cards

function leftSlide() {
  animate(-distance);
}
function rightSlide() {
  animate(distance);
}

function animate(distance) {
  movable.animate(
    [
      { transform: `translate(${x}px)` },
      { transform: `translate(${x + distance}px)` },
    ],
    {
      duration: 400,
      iterations: 1,
      fill: "forwards",
    }
  );
  x += distance;
}
