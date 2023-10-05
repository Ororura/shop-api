"use strict";

const sideBar = document.getElementsByClassName("side-bar");
const closeEl = document.getElementById("close");
const openEl = document.getElementById("arrow-rigth");

sideBar[0].style.transition = "150ms";


closeEl.addEventListener("click", () => {
  sideBar[0].style.display = "none";
  openEl.style.display = "block"
});

console.log(openEl);

openEl.addEventListener("click", () => {
  sideBar[0].style.display = "block";
  openEl.style.display = "none"
});
