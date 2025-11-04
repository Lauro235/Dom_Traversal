// IMPORTS

import clientDocument from "./getClient.js";

// CLASSES

class HTMLNode {
  constructor(node, firstChild = null, parent = null, nextSibling = null, level = 0) {
    this.node = node; // Value of the node
    this.parent = parent; // Reference to the parent element
    this.firstChild = firstChild; // Reference to the child node(s) => should be stored in NodeList
    this.nextSibling = nextSibling; // Reference to the sibling node(s) => should be stored in array?
    this.level = level // ensure level is greater than parent by one.
  }
}

// GLOBAL VARS

const clientBody = clientDocument.body;
const nodeList = [];
const nodeMemo = new Map();


const buildNodeMemo = (node, memo) => {
  // if (key in memo) return memo;
  if (node === null) {
    return memo;
  };
  // node not null
  if (memo.size === 0) {
    memo.set(node,new HTMLNode(node, node.firstElementChild))
    buildNodeMemo(node.firstElementChild, memo)
  }
  else {
    memo.set(node, new HTMLNode(node, node.firstElementChild, node.parentElement, node.nextElementSibling, memo.get(node.parentElement)["level"] + 1))
    buildNodeMemo(node.firstElementChild, memo);
    buildNodeMemo(node.nextElementSibling, memo);
  }
  return memo
}

buildNodeMemo(clientBody, nodeMemo)

// push all nodes to list - lists in order of appearance. Is this useful?

const treeWalker = clientDocument.createTreeWalker(
  clientDocument.body,
  NodeFilter.SHOW_ELEMENT,
  {
    acceptNode(node) {
      return NodeFilter.FILTER_ACCEPT;
    },
  },
  false
);

let currentNode = treeWalker.currentNode;

while (currentNode) {
  nodeList.push({node: currentNode});
  currentNode = treeWalker.nextNode();
}

