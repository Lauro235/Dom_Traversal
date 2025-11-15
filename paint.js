import clientDocument from "./getClient.js";
import { childrenNodeContainerElement, nodeContainerElement, currentNodeContainerElement, parentNodeContainerElement } from "./selectors.js";
import { CurrentNode, NodeRect } from "./classes.js";
import { nodeContainerDetails } from "./format.js";

const firstNodeTest = clientDocument.body.children[0];

function setCurrentNode(externalCurrentNode) {
  if (externalCurrentNode === null || externalCurrentNode === undefined) {
    return new CurrentNode(clientDocument.body.firstElementChild);
  }

  return new CurrentNode(externalCurrentNode, externalCurrentNode?.siblingSet, externalCurrentNode?.siblings);
}

function setUpGrid(isParent, isChild) {
  // manipulates grid through applying preselected classes and modifying template rows.

  if (isParent && isChild) {
    childrenNodeContainerElement.classList.remove("hidden")
    parentNodeContainerElement.classList.remove("hidden");
    nodeContainerElement.style.gridTemplateRows = "1fr 1fr 1fr";

    // As all nodes need to be equally prioritised we must remove all classes that effect row formatting 
    console.log([parentNodeContainerElement, currentNodeContainerElement, childrenNodeContainerElement]);


    [parentNodeContainerElement, currentNodeContainerElement, childrenNodeContainerElement].forEach(element => {
      element.classList.remove("take-up-all-rows", "take-up-first-half-vertical-space", "take-up-last-half-vertical-space")
    });

  }
  else if (isParent && !isChild) {
    childrenNodeContainerElement.classList.add("hidden");
    parentNodeContainerElement.classList.remove("hidden");

    parentNodeContainerElement.classList.add("take-up-first-half-vertical-space")
    currentNodeContainerElement.classList.add("take-up-last-half-vertical-space")
    nodeContainerElement.style.gridTemplateRows = "1fr 1fr"
  }
  else if (!isParent && isChild) {
    parentNodeContainerElement.classList.add("hidden");
    childrenNodeContainerElement.classList.remove("hidden");

    currentNodeContainerElement.classList.add("take-up-first-half-vertical-space")
    childrenNodeContainerElement.classList.add("take-up-last-half-vertical-space")
    nodeContainerElement.style.gridTemplateRows = "1fr 1fr"
  }
  else {
    childrenNodeContainerElement.classList.add("hidden");
    parentNodeContainerElement.classList.add("hidden");
    currentNodeContainerElement.classList.add("take-up-all-rows")
    nodeContainerElement.style.gridTemplateRows = "1fr"
  }
}

function renderCurrentNodeGeneration(externalCurrentNode) {
  /*
    please simplify current instance to simply `current`. The properties are self descriptive.

    This function renders an element to the client for each external node of current generation (sibling). It also adds a reference to the clients current element, which can be referred to elsewhere.  
    
  */


  externalCurrentNode.siblings.forEach((sibling, i) => {
    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node");
    nodeElement.setAttribute("tabindex", i);
    currentNodeContainerElement.querySelector(".flex").appendChild(nodeElement)

    // At this point we can update the externalCurrentNode (passed via initial arg) with .siblings at i with new NodeRect(nodeElement) 

    externalCurrentNode.siblings[i] = new NodeRect(sibling.externalNode, nodeElement)

    if (sibling.externalNode === externalCurrentNode.externalNode) {
      externalCurrentNode.clientNode = nodeElement;
      nodeElement.classList.add("focus");
    }

    // don't expect sibling to update after updating the externalCurrentNode siblings 
    // console.log(sibling);

  })
}

function scrollSiblings(externalCurrentNode) {

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


  console.log(externalCurrentNode);

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

function paint() {
  // paint cycle
  // set current node
  let externalCurrentNode = setCurrentNode(firstNodeTest);

  // parent checks needed for rendering, must be reusable
  const isParent = checkValidParent(externalCurrentNode.externalNode);
  const isChild = checkValidChildren(externalCurrentNode.externalNode);

  // Ensure correct grid layout
  setUpGrid(isParent, isChild);

  // At this point I had the thought to extract the sibling helpers out of the CurrentNode class, but for now, I'm content with only rendering a single parent. I could potentially have 2 CurrentNode instances to have access to the sibling helpers for the parent. .children covers descendent nodes.

  // render current gen
  renderCurrentNodeGeneration(externalCurrentNode)

  // console.log(externalCurrentNode);

  scrollSiblings(externalCurrentNode)


};

document.addEventListener("DOMContentLoaded", paint());