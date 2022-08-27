"use strict";

let popupDiv = document.querySelector("#popup");
let petName = popupDiv.querySelector(".name");
let breed = popupDiv.querySelector(".breed");
let description = popupDiv.querySelector(".description");
let age = popupDiv.querySelector(".age");
let inoculations = popupDiv.querySelector(".inoculations");
let diseases = popupDiv.querySelector(".diseases");
let parasites = popupDiv.querySelector(".parasites");
let img = popupDiv.querySelector("img");

let closeBtn = document.querySelector("#close-popup");

function popup(pets, target) {
  // name is a key
  const theName = target.parentNode.querySelector(".name").textContent;

  for (let pet of pets) {
    if (pet.name == theName) {
      petName.textContent = pet.name;
      breed.textContent = pet.type + " - " + pet.breed;
      description.textContent = pet.description;
      age.textContent = "Age: " + pet.age;
      inoculations.textContent = "Inoculations: " + pet.inoculations;
      diseases.textContent = "Diseases: " + pet.diseases;
      parasites.textContent = "Parasites: " + pet.parasites;
      img.src = pet.img;
    }
  }
  blackout.className += " blackout-on";
  popupDiv.classList.remove("hidden");
  closeBtn.classList.remove("hidden");
  document.body.className += " overflow-hidden";

  blackout.addEventListener("mouseover", () => closeBtn.focus());
  blackout.addEventListener("mouseout", () => closeBtn.blur());

  blackout.addEventListener("click", hidePopup);
  closeBtn.addEventListener("click", hidePopup);
}

function hidePopup() {
  popupDiv.className += " hidden";
  closeBtn.className += " hidden";
  blackout.classList.remove("blackout-on");
  document.body.classList.remove("overflow-hidden");
}
