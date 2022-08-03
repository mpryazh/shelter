"use strict";

fetch('../main/pets.json')
  .then(response => response.json())
  .then(processData)

function processData(data) {
    let pets = []; 
    for (let pet of data) {
        pets.push(pet);
    }

    let cards = document.querySelectorAll(".card");
    addInfo(cards, pets);

    let cardsPage = document.querySelector("#cards");
    for (let i=0; i<5; i++) {
        let newPage = cardsPage.cloneNode(true);
        addInfo(newPage.querySelectorAll(".card"),pets)
        pages.append(newPage);
    }
}

let pages = document.querySelector("#pages");


function addInfo(cards, pets) {
    let newPets = getPets(pets);

    cards.forEach(card => {
        let thePet = newPets.pop();
        let cardImg = card.querySelector("img");
        cardImg.setAttribute("src", thePet.img);
        let name = card.querySelector(".name");
        name.innerText = thePet.name;
        // add popup event
        card.querySelector("button").addEventListener("click", (event) => popup(pets, event.target));
    });
}

function getPets(pets) {
    shuffle(indexes);
    let currentPets = [];
    for (let i of indexes) {
        currentPets.push(pets[i]);
    }
    return currentPets;
}

function shuffle(array) {
    // switch every element with a random one
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

let indexes = [...Array(8).keys()];


const nextBtn = document.querySelector(".to-next");
nextBtn.addEventListener("click", leftSlide);

const backBtn = document.querySelector(".to-previous");
backBtn.addEventListener("click", rightSlide);

const firstBtn = document.querySelector(".to-first");
firstBtn.addEventListener("click", toFirst);

const lastBtn = document.querySelector(".to-last");
lastBtn.addEventListener("click", toLast);

const pageBtn = document.querySelector("#current-page");
let pageNumber = 1;
pageBtn.textContent = pageNumber;


// animation
let movable = document.getElementById('pages');
let x = 0;

const pagesStyle = getComputedStyle(movable);
const gap = +pagesStyle.gap.slice(0,-2);
const distance = movable.offsetWidth + gap; // how far to move cards


function leftSlide(){
    animate(-distance);
    pageNumber++;
    changeButtonsState();
}
function rightSlide(){
    animate(distance);
    pageNumber--;
    changeButtonsState();
}
function toFirst() {
    while(pageNumber != 1) {
        rightSlide();
    }
}
function toLast() {
    while(pageNumber != 6) {
        leftSlide();
    }  
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

function changeButtonsState() {
    pageBtn.textContent = pageNumber;

    firstBtn.disabled = pageNumber == 1;
    backBtn.disabled = pageNumber == 1;

    lastBtn.disabled = pageNumber == 6;
    nextBtn.disabled = pageNumber == 6;
}