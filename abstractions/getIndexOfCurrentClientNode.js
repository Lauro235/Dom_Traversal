export default function getIndexOfCurrentClientNode(current) {
  return current.siblings.findIndex((node, i) => {
    return node.externalNode === current.externalNode
  });
}

