"use strict";

// mobile menu
const menu = document.querySelector("#mobile-menu");
const logo = document.querySelector(".logo");
const menuLogo = logo.cloneNode(true);
menuLogo.id = "logo-copy";
const navigation = document.querySelector("nav ul").cloneNode(true);

menu.append(menuLogo, navigation);

const burger = document.querySelector("#burger");
burger.addEventListener("click", openMenu);

// close menu when click on links
const menuLinks = menu.querySelectorAll("a");
menuLinks.forEach(link => link.addEventListener("click", closeMenu));

// close menu when click outside of menu
const blackout = document.querySelector(".blackout");
blackout.addEventListener("click", closeMenu);

function openMenu() {
    // open/close menu
    if (menu.className == "open") {
        closeMenu();
    }
    else {
        menu.className = "open";
        burger.className = "burger-open";
        blackout.className += " blackout-on";
    }
}
function closeMenu() {
    menu.className = "closed";
    burger.className = "burger-closed";

    // set delay 0.3s for animation before hiding menu
    setTimeout(() => menu.className += " hidden", 300);

    blackout.classList.remove("blackout-on");
}




