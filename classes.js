class NodeRect {
  constructor(externalNode, clientNode = null) {
    this.externalNode = externalNode;
    this.clientNode = clientNode;
    // include this.clientNode for access to browser viewable node

    // rewrite this ⏬ to clientNode and ensure that rect, dimensions and boundaries are null until this.clientNode exists.
    // this.rect = this.externalNode.getBoundingClientRect();

    if (this.clientNode) {
      this.rect = this.clientNode?.getBoundingClientRect();
      this.dimensions = new ContainerDimensions(this.rect.height, this.rect.width);
      this.boundaries = new ContainerBoundaries(this.rect.top, this.rect.bottom, this.rect.left, this.rect.right);
    }


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
      // this.siblings = this.sortSiblings(this.siblingSet);
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

  findSiblings(node, nodeSet = new Set()) {
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

    // const unsortedSet = [...nodeSet];
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
    }).map((node) => {
      return new NodeRect(node)
    });
  }
}

class ContainerDimensions {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
class ContainerBoundaries {
  constructor(top, bottom, left, right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }
}

export { CurrentNode, ContainerDimensions, ContainerBoundaries, NodeRect }