import clientDocument from "./getClient.js";

// GLOBAL VARS

debugger;
const nodeMemo = {};

const getNodeLevel = (node, memo) => {
  /*
    Good start, but data structure does not allow for repeated node types that are on different levels. For instance body>div is picked up, but body>section>div is not. Div currently cannot exist on multiple levels.
  */
  const key = node.tagName;
  const parent = node?.parentNode

  // if (key in memo) return memo;
  if (key === "BODY") {
    console.log(key);
    console.log(memo);

    memo[key] = 0;
    return memo;
  };
  if (parent && parent.tagName in memo) {
    memo[key] = memo[parent?.tagName] + 1
  }

  return getNodeLevel(parent, memo)
}


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

const nodeList = []
let currentNode = treeWalker.currentNode;

while (currentNode) {

  nodeList.push(currentNode);
  console.log(getNodeLevel(currentNode, nodeMemo))
  currentNode = treeWalker.nextNode();
}

// console.log(treeWalker.filter);
