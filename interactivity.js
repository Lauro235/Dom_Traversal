// Close opening modal

const closeInstructionsButton = document.getElementById("close-instructions");
const introModal = document.getElementById("intro-modal")
const introOverlay = document.getElementById("intro-overlay")
const navigationsArrows = document.querySelectorAll('.navigation__arrow');
const [upArrow, leftArrow, downArrow, rightArrow] = Array.from(navigationsArrows);
const terminalInput = document.querySelector("#terminal-input");


const navigationListener = (e) => {
  if (e.ctrlKey && e.key === "ArrowUp") {
    console.log("oooooh loook uppp there!");
    upArrow.focus();
  }
  if (e.ctrlKey && e.key === "ArrowDown") {
    console.log("oooooh loook doooowwwwwwwwnn there!");
    downArrow.focus();
  }
  if (e.ctrlKey && e.key === "ArrowLeft") {
    console.log("To the left, to the left!");
    leftArrow.focus();
  }
  if (e.ctrlKey && e.key === "ArrowRight") {
    console.log("Right on 🤜🤛");
    rightArrow.focus();
  }
  if (!e.ctrlKey && e.key === "/") {
    console.log("Editing my biog");
    terminalInput.focus()
  }
}


closeInstructionsButton.addEventListener("click", (e) => {
  introModal.classList.add("hidden");
  introOverlay.classList.add("hidden")
  e.preventDefault()
});

document.body.addEventListener("keydown", (e) => {
  // console.log(e);
  navigationListener(e);
})

