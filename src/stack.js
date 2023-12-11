const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
module.exports = class Stack {
  constructor() {
    this.elements = [];
  }

  push(element) {
    this.elements.push(element); 
  }

  pop() {
    return this.elements.pop(); 
  }

  peek() {
    if (this.elements.length === 0) {
      return undefined;
    }
    return this.elements[this.elements.length - 1];
  }
};

const Stack = require('./stack');
const stack = new Stack();

stack.push(1);
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.pop());