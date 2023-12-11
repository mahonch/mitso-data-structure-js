const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined with this interface
 * function ListNode(x) {
 *   this.value = x;
 *   this.next = null;
 * }
 */
function ListNode(x) {
  this.value = x;
  this.next = null;
}

module.exports = function removeKFromList(l, k) {
  let current = l;
  let prev = null;

  while (current !== null) {
    if (current.value === k) {
      if (prev === null) {
        l = current.next;
      } 
      else {
        prev.next = current.next;
      }
    } 
    else {
      prev = current;
    }
    current = current.next;
  }

  return l;
}

const removeKFromList = require('./remove-from-list');

const list = new ListNode(3);
list.next = new ListNode(1);
list.next.next = new ListNode(2);
list.next.next.next = new ListNode(3);
list.next.next.next.next = new ListNode(4);
list.next.next.next.next.next = new ListNode(5);

const k = 3;

const updatedList = removeKFromList(list, k);
console.log(updatedList);