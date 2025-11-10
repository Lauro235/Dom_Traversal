// IMPORTS

import clientDocument from "./getClient.js";

// CLASSES

class HTMLNode {
  constructor(node, firstChild = null, parent = null, nextSibling = null, previousSibling = null, level = 0) {
    this.node = node; // Value of the node
    this.parent = parent; // Reference to the parent element
    this.firstChild = firstChild; // Reference to the child node(s) => should be stored in NodeList
    this.previousSibling = previousSibling
    this.nextSibling = nextSibling; // Reference to the sibling node(s) => should be stored in array?
    this.level = level // ensure level is greater than parent by one.
  }
}

class CurrentNode {
  constructor(node, siblingSet = new Set(), siblings = null) {
    this.node = node;
    this.err = this.improperNode(node)

    if (this.err) {
      console.error("node must exist within the DOM and may not be <head>, <body> or <script>.")
      return;
    }
    
    this.children = node.children;
    this.siblingSet = siblingSet;

    if (!this.siblingSet.has(node)) {
      this.siblingSet.clear()
      this.siblingSet = this.findSiblings(node, this.siblingSet);
      this.siblings = this.siblingSet.size > 0 ? this.sortSiblings(this.siblingSet) : [];
    }
    // else siblingSet does have node and we do not need to call findSiblings again.
    else {
      this.siblings = siblings;
    }
    
  }
  
  improperNode(node) {
    if (node === null || node.tagName === "SCRIPT" || node.tagName === "HEAD" || node.tagName === "BODY") {
      return true;
    }
    return false;
  }
  
  findSiblings (node, nodeSet = new Set()) {
    if (node === null || nodeSet.has(node) || node.tagName === "SCRIPT") return nodeSet;
    if (node !== null && !nodeSet.has(node)) {
      nodeSet.add(node);
    }

    // check for previous siblings. if previous sibling exist add to set
    if (node.previousElementSibling) {
      this.findSiblings(node.previousElementSibling, nodeSet)
    }
    if (node.nextElementSibling) {
      this.findSiblings(node.nextElementSibling, nodeSet);
    }

    return nodeSet;
  }

  sortSiblings(siblingSet) {
    return [...siblingSet].sort((a, b) => {
      if (a === b) return 0;
      if (!a.compareDocumentPosition) {
        // Support for IE8 and below
        return a.sourceIndex - b.sourceIndex;
      }
      if (a.compareDocumentPosition(b) & 2) {
        // b comes before a
        return 1;
      }
      return -1;
    });
  }
}

// GLOBAL VARS

const clientBody = clientDocument.body;

const buildNodeMemo = (node = document.body.firstElementChild, memo = new Map()) => {
  // if (key in memo) return memo;

  if (node === null) {
    return memo;
  };
  // node not null
  if (memo.size === 0) {
    memo.set(node, new HTMLNode(node, node.firstElementChild))
    buildNodeMemo(node.firstElementChild, memo)
  }
  else if (node.nextElementSibling && node.nextElementSibling.nodeName === "SCRIPT") {
    memo.set(node, new HTMLNode(node, node.firstElementChild, node.parentElement, node.nextElementSibling, memo.get(node.parentElement)["level"] + 1))
    buildNodeMemo(node.firstElementChild, memo);
  }
  else {
    memo.set(node, new HTMLNode(node, node.firstElementChild, node.parentElement, node.nextElementSibling, memo.get(node.parentElement)["level"] + 1))
    buildNodeMemo(node.firstElementChild, memo);
    // do not call these if script is next element
    buildNodeMemo(node.nextElementSibling, memo);
  }
  return memo
}


let currentNode = new CurrentNode(clientBody.firstElementChild);

console.log(currentNode);



