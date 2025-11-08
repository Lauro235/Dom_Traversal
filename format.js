// classes

class ContainerDimensions {
  constructor(height,width) {
    this.height = height;
    this.width = width;
  }
}

// GLOBAL VARIABLES
const terminalInput = document.getElementById("terminal-input")
const nodeContainer = document.getElementById("node-container");
let containerDimensions = new ContainerDimensions(window.innerHeight, window.innerWidth)

window.addEventListener('resize', function() {
    containerDimensions.width = window.innerWidth;
    containerDimensions.height = window.innerHeight;
    // Update the DOM or perform other actions
    console.log(containerDimensions);
    
});