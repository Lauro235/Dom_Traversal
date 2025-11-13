import clientDocument from "./getClient.js";
import { CurrentNode } from "./dataStructures.js";
import { childrenNodeContainer, nodeContainer, currentNodeContainer, parentNodeContainer } from "./selectors.js";

const firstNodeTest = clientDocument.body.children[2];

function setCurrentNode(currentNode) {
  if (currentNode === null || currentNode === undefined) {
    return new CurrentNode(clientDocument.body.firstElementChild);
  }
  
  return new CurrentNode(currentNode, currentNode?.siblingSet, currentNode?.siblings);
}

function setUpGrid(isParent, isChild) {
  // manipulates grid through applying preselected classes and modifying template rows.
  
  if (isParent && isChild) {
    childrenNodeContainer.classList.remove("hidden")
    parentNodeContainer.classList.remove("hidden");
    nodeContainer.style.gridTemplateRows = "1fr 1fr 1fr";
    
    // As all nodes need to be equally prioritised we must remove all classes that effect row formatting 
    console.log([parentNodeContainer, currentNodeContainer, childrenNodeContainer]);
    
    
    [parentNodeContainer, currentNodeContainer, childrenNodeContainer].forEach(element => {
      element.classList.remove("take-up-all-rows", "take-up-first-half-vertical-space", "take-up-last-half-vertical-space")
    });
    
  }
  else if (isParent && !isChild) {
    childrenNodeContainer.classList.add("hidden");
    parentNodeContainer.classList.remove("hidden");

    parentNodeContainer.classList.add("take-up-first-half-vertical-space")
    currentNodeContainer.classList.add("take-up-last-half-vertical-space")
    nodeContainer.style.gridTemplateRows = "1fr 1fr"
  }
  else if (!isParent && isChild) {
    parentNodeContainer.classList.add("hidden");
    childrenNodeContainer.classList.remove("hidden");

    currentNodeContainer.classList.add("take-up-first-half-vertical-space")
    childrenNodeContainer.classList.add("take-up-last-half-vertical-space")
    nodeContainer.style.gridTemplateRows = "1fr 1fr"
  }
  else {
    childrenNodeContainer.classList.add("hidden");
    parentNodeContainer.classList.add("hidden");
    currentNodeContainer.classList.add("take-up-all-rows")
    nodeContainer.style.gridTemplateRows = "1fr"
  }
}

function checkValidParent(node) {
  return (node.parentElement && node.parentElement.tagName !== "BODY");
}

function checkValidChildren(node) {
  return (node.children.length > 0);
}

function paint() {
  // paint cycle
  // set current node
  let currentNode = setCurrentNode(firstNodeTest);

  // parent checks needed for rendering, must be reusable
  const isParent = checkValidParent(currentNode.node);
  const isChild = checkValidChildren(currentNode.node);

  // Ensure correct grid layout
  setUpGrid(isParent, isChild);

  // render current gen
  
  
  
  
};

document.addEventListener("DOMContentLoaded", paint());