// Close opening modal

const closeInstructionsButton = document.getElementById("close-instructions");
const introModal = document.getElementById("intro-modal")
const introOverlay = document.getElementById("intro-overlay")

closeInstructionsButton.addEventListener("click", (e) => {
  introModal.classList.add("hidden");
  introOverlay.classList.add("hidden")
  e.preventDefault()
})