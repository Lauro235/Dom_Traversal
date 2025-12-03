class IndexTracker {
  constructor() {
    this.parentIndex = new NodeGenerationIndex(0);
    this.currentIndex = new NodeGenerationIndex(0);
    this.childIndex = new NodeGenerationIndex(0);
  }
}

class NodeGenerationIndex {
  constructor(index = null) {
    this.val = index;
    this.set = (callback) => { this.val = callback() }
  }
  valueOf() {
    return this.val;
  }
}

export default IndexTracker;