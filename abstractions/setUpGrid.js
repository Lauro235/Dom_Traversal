import { childrenNodeContainerElement, currentNodeContainerElement, parentNodeContainerElement, nodeContainerElement } from "../selectors.js";

export default function setUpGrid(isParent, isChild) {
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