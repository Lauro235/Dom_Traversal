import clientDocument from "./getClient.js";
import { childrenNodeContainerElement, nodeContainerElement, currentNodeContainerElement, parentNodeContainerElement } from "./selectors.js";
import { FirstNode, NodeRect } from "./classes.js";
import { nodeContainerDetails } from "./format.js";
import setFirstNode from "./abstractions/setFirstNode.js";
import setUpGrid from "./abstractions/setUpGrid.js";
import getIndexOfCurrentClientNode from "./abstractions/getIndexOfCurrentClientNode.js"

import IndexTracker from "./classes/indexTracker.js";
const {currentIndex: {val: currentI}, childIndex: {val: childI}} = new IndexTracker();

// console.log(IndexTracker);

// currentindex.
const currentStartingNode = clientDocument.body.children[currentI];

function defineGridChunk(chunk) {
  let gridFractionString = ""
  for (let i = 0; i < chunk; i++) {
    gridFractionString += "1fr "
  }
  return gridFractionString.trimEnd();
}


function createNodeContainer(siblingsLength, chunk, gridString, generation) {
  const numberOfDivsToCreate = Math.ceil(siblingsLength / chunk);

  for (let i = 1; i <= numberOfDivsToCreate; i++) {
    const container = document.createElement("div");
    container.id = `${generation}-wrapper${i}`;
    container.classList.add("grid", "chunk");
    container.style.gridTemplateColumns = gridString;
    currentNodeContainerElement.appendChild(container);
  }
}

function renderCurrentNodeGeneration(siblings, chunk, gridString, generation) {
  /*
    This function renders an element to the client for each external node of current generation (sibling). It also adds a reference to the clients current element, which can be referred to elsewhere.  
  */
  // createNodeContainer(siblings.length, chunk, gridString, generation)

  siblings.forEach((sibling, i) => {
    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node-square");
    nodeElement.setAttribute("tabindex", i);
    currentNodeContainerElement.querySelector(`#${generation}-wrapper${Math.ceil((i + 1) / chunk)}`).appendChild(nodeElement)

    siblings[i] = new NodeRect(sibling.externalNode, nodeElement)
  })
}

// come back to this later
function scrollSiblings(current) {
  console.log(current.clientNode);

  /*
    function centerItem(container, item) {
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const itemWidth = itemRect.width;
      const scrollOffset = (item.offsetLeft + itemWidth / 2) - (containerWidth / 2);
      container.scrollTo({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }   
  */


  // currentNodeContainerElement.scrollTo({
  // left: scrollOffSet,
  // behavior: "smooth"
  // })


}

function checkValidParent(node) {
  return (node.parentElement && node.parentElement.tagName !== "BODY");
}

function checkValidChildren(node) {
  return (node.children.length > 0);
}

function focusNode(siblings, i) {
  const nodeToFocus = siblings[i]["clientNode"]
  nodeToFocus.classList.add("focus")
  return nodeToFocus;
}

// Paint should only be called if the `current` node generation changes - generation should always be current
function paint(current = setFirstNode(currentStartingNode), chunk = 3, generation = "current") {
  // paint cycle

  // parent checks needed for rendering, must be reusable
  const hasParent = checkValidParent(current.externalNode);
  const hasChild = checkValidChildren(current.externalNode);


  // Ensure correct grid layout for possible parent, current and child nodes (vertical grid)
  setUpGrid(hasParent, hasChild);

  const gridString = defineGridChunk(chunk)

  // At this point I had the thought to extract the sibling helpers out of the FirstNode class, but for now, I'm content with only rendering a single parent. I could potentially have 2 FirstNode instances to have access to the sibling helpers for the parent. .children covers descendent nodes.

  const currentSiblings = current.siblings;
  

  createNodeContainer(currentSiblings.length, chunk, gridString, generation)
  
  // render current - SIMPLIFY
  // May be called for other generations i.e parent or child.
  // to make it more generic, we would need to 
  renderCurrentNodeGeneration(currentSiblings, chunk, gridString, generation)
  focusNode(currentSiblings, currentI);

  

  // How can we use current to define and track 0 to save having to rerender again

  console.log();
  


};

document.addEventListener("DOMContentLoaded", paint());