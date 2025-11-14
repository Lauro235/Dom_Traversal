import clientDocument from "./getClient.js";
import { childrenNodeContainerElement, nodeContainerElement, currentNodeContainerElement, parentNodeContainerElement } from "./selectors.js";
// import { childrenNodeContainer, nodeContainer, currentNodeContainer, parentNodeContainer } from "./selectors.js";
import { CurrentNode, NodeRect } from "./classes.js";

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
    externalCurrentNode refers to external node as does node.node
    nodeElement refers to clientNode which is appended to nodeContainer.
  */
  
  
  externalCurrentNode.siblings.forEach((sibling, i) => {
    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node");
    nodeElement.setAttribute("tabindex", i);
    currentNodeContainerElement.querySelector(".flex").appendChild(nodeElement)

    // At this point we can update the externalCurrentNode (passed via initial arg) with .siblings at i with new NodeRect(nodeElement) 

    externalCurrentNode.siblings[i] = new NodeRect(sibling.externalNode, nodeElement)
    // console.log(externalCurrentNode.siblings);
    
    if (sibling.externalNode === externalCurrentNode.node) {
      // focus the node
      console.log("this node is the starting node: expecting first child", nodeElement);
      // console.log(node);
      nodeElement.classList.add("focus");
    }

    // don't expect sibling to update after updating the externalCurrentNode siblings 
    // console.log(sibling);
    
  })
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
  const isParent = checkValidParent(externalCurrentNode.node);
  const isChild = checkValidChildren(externalCurrentNode.node);

  // Ensure correct grid layout
  setUpGrid(isParent, isChild);

  // At this point I had the thought to extract the sibling helpers out of the CurrentNode class, but for now, I'm content with only rendering a single parent. I could potentially have 2 CurrentNode instances to have access to the sibling helpers for the parent. .children covers descendent nodes.
  
  // render current gen
  renderCurrentNodeGeneration(externalCurrentNode)
  
  console.log(externalCurrentNode);
  
  
  
};

document.addEventListener("DOMContentLoaded", paint());