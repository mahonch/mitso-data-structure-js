const { NotImplementedError } = require("../extensions/index.js");
const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      this.insertNode(this.rootNode, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    return this.searchNode(this.rootNode, data);
  }

  searchNode(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.searchNode(node.left, data);
    } else if (data > node.data) {
      return this.searchNode(node.right, data);
    } else {
      return node;
    }
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      const minRight = this.findMinNode(node.right);
      node.data = minRight.data;
      node.right = this.removeNode(node.right, minRight.data);
      return node;
    }
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  min() {
    if (this.rootNode === null) {
      return null;
    } else {
      let currentNode = this.rootNode;
      while (currentNode.left !== null) {
        currentNode = currentNode.left;
      }
      return currentNode.data;
    }
  }

  max() {
    if (this.rootNode === null) {
      return null;
    } else {
      let currentNode = this.rootNode;
      while (currentNode.right !== null) {
        currentNode = currentNode.right;
      }
      return currentNode.data;
    }
  }
};

const BinarySearchTree = require('./binary-search-tree');

const tree = new BinarySearchTree();

tree.add(5);
tree.add(3);
tree.add(7);
tree.add(2);
tree.add(4);
tree.add(6);
tree.add(8);

console.log(tree.root().data);
console.log(tree.min());
console.log(tree.max());
console.log(tree.has(7));
console.log(tree.has(9));
console.log(tree.find(3).data);

tree.remove(7);
console.log(tree.has(7));
console.log(tree.max());