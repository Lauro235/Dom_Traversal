// import { ContainerDimensions, ContainerBoundaries } from "./classes.js";
import { ContainerDimensions, StaticNodeRect } from "./classes.js";
import { nodeContainerElement } from "./selectors.js";

// GLOBAL VARIABLES
// const terminalInput = document.getElementById("terminal-input")
// const nodeContainer = document.getElementById("node-container");

// holds details relating to height, width, top, bottom, left, right
const nodeContainerDetails = new StaticNodeRect(nodeContainerElement);

let windowDimensions = new ContainerDimensions(window.innerHeight, window.innerWidth)
// let nodeContainerDimensions = new ContainerDimensions(nodeContainerRect.height, nodeContainerRect.width)



window.addEventListener('resize', function () {
  windowDimensions.width = window.innerWidth;
  windowDimensions.height = window.innerHeight;

  nodeContainerDetails.rect = nodeContainerElement.getBoundingClientRect();
  nodeContainerDetails.dimensions.width = nodeContainerDetails.rect.width
  nodeContainerDetails.dimensions.height = nodeContainerDetails.rect.height
  // Update the DOM or perform other actions
  

});

export { nodeContainerDetails }