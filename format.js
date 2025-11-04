// classes

class ContainerDimensions {
  constructor(height,width) {
    this.height = height;
    this.width = width;
  }
}

// GLOBAL VARIABLES
const title = document.getElementById("title");
const commandInput = document.getElementById("command__input")
const nodeContainer = document.getElementById("node__container");
let containerDimensions = new ContainerDimensions(window.innerHeight, window.innerWidth)

// place node container beneath title.
nodeContainer.style.top = title.clientHeight + 32 + "px"

// Update node window height
nodeContainer.style.height = (containerDimensions.height - (title.clientHeight + commandInput.offsetHeight + 64)) + "px"

window.addEventListener('resize', function() {
    containerDimensions.width = window.innerWidth;
    containerDimensions.height = window.innerHeight;
    // Update the DOM or perform other actions
    console.log(containerDimensions);
    
});