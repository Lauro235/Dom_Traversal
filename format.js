// import { ContainerDimensions, ContainerBoundaries } from "./classes.js";
import { NodeRect, ContainerDimensions } from "./classes.js";
import { nodeContainerElement } from "./selectors.js";

// GLOBAL VARIABLES
// const terminalInput = document.getElementById("terminal-input")
// const nodeContainer = document.getElementById("node-container");
let nodeContainer = new NodeRect(nodeContainerElement);

let windowDimensions = new ContainerDimensions(window.innerHeight, window.innerWidth)
// let nodeContainerDimensions = new ContainerDimensions(nodeContainerRect.height, nodeContainerRect.width)



window.addEventListener('resize', function() {
    windowDimensions.width = window.innerWidth;
    windowDimensions.height = window.innerHeight;

    nodeContainer.rect = nodeContainerElement.getBoundingClientRect();
    console.log(nodeContainer);
    
    
    nodeContainer.dimensions.width = nodeContainer.rect.width
    nodeContainer.dimensions.height = nodeContainer.rect.height
    // Update the DOM or perform other actions
    console.log(nodeContainer.dimensions);
    
});