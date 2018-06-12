/* 1 (*)
Create an iterable without using generator function.
See the tests for this function to get the spec.
*/
const simpleIterable = {
  [Symbol.iterator]() {
    let count = 0;
    const iterator = {
      next() {
        count += 1;
        switch (count) {
          case 1:
            return { value: 1, done: false };
          case 2:
            return { value: 2, done: false };
          case 3:
            return { value: 3, done: false };
          case 4:
            return { value: 4, done: false };
          case 5:
            return { value: 5, done: false };
          default:
            return { value: undefined, done: true };
        }
      },
    };
    return iterator;
  },
};

/* 2 (*)
Create an iterable using generator function.
It should have the same functionality as the one in question 1
*/
function* generatorIterable() {
  let count = 0;
  while (count <= 4) {
    count += 1;
    yield count;
  }
}

/* 3 (Q6 in tests)
Consumable users:
- `nextUser` gives the next user and removes it from this.users.
- `done` tells if all the users are consumed
*/
/* eslint-disable no-underscore-dangle, class-methods-use-this */
class ConsumableUsers {
  constructor() {
    this.users = ['Alice', 'Bob'];
    this._done = false;
  }
  get nextUser() {
    // Implement this according to test spec (for creating iterable)
    return [];
  }
  get done() {
    // Implement this according to test spec (for creating iterable)
    return false;
  }
}
/* eslint-enable no-underscore-dangle, class-methods-use-this */

// 4 (*) (Q7 in tests)
const fibonacci = {
  [Symbol.iterator]() {
    let a = 1;
    let b = 2;
    let newValue = 0;
    let count = 0;
    const iterator = {
      next() {
        count += 1;
        if (count === 1) {
          return { value: a, done: true };
        }
        if (count === 2) {
          return { value: b, done: true };
        }
        newValue = a + b;
        a = b;
        b = newValue;
        return { value: newValue, done: true };
      },
    };
    return iterator;
  },
};

// 5 (*) (Q8 in tests)
/*
  isIterableEmpty([]);
  //=> true

  isIterableEmpty(new Set([1, 2]));
  //=> false

  Do not use Array.from()
*/
function isIterableEmpty(object) {
  if (typeof object[Symbol.iterator] === 'function') {
    return false;
  }
  return true;
}

/* 6 (*) (Q9 in tests)
  isIterable([ 1, 2, 3 ]) // true
  isIterable('ABC') // true
  isIterable({ length: 1, 0: 'Alpha' }) // false
  isIterable({ key: 'value' }) // false
  isIterable(new Map()) // true
*/
function isIterable(object) {
  if (object === null) {
    return false;
  }
  return typeof object[Symbol.iterator] === 'function';
}

/* 7 (Q10 in tests)
  Create a class that is used to iterate over an array in a circular way;
  i.e., restarts from the beginning after reaching the end.

  const cycled = new Cycled([1, 2, 3]);
  cycled.current();
  //=> 1

  cycled.next();
  //=> 2

  cycled.next();
  //=> 3

  cycled.next();
  //=> 1

  cycled.previous();
  //=> 3
*/
class Cycled extends Array {}

// 8 (*) (Q11 in tests)
// range(1, 5)
// => [1, 2, 3, 4, 5]
function range() {}

module.exports = {
  simpleIterable,
  generatorIterable,
  ConsumableUsers,
  fibonacci,
  isIterableEmpty,
  isIterable,
  Cycled,
  range,
};
