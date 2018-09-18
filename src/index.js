/* 1 (*)
Create an iterable without using generator function.
See the tests for this function to get the spec.
*/
function simpleIterable() {
  return {
    [Symbol.iterator]() {
      return {
        state: 0,
        next: function next() {
          if (this.state >= 5) return { value: undefined, done: true };

          this.state += 1;
          return { value: this.state, done: false };
        },
      };
    },
  };
}

/* 2 (*)
Create an iterable using generator function.
It should have the same functionality as the one in question 1
*/
function* generatorIterable() {
  let i = 1;
  while (i <= 5) {
    yield i;
    i += 1;
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
    if (this.users.length === 0) return undefined;
    return `user: ${this.users.shift()}`;
  }
  get done() {
    // Implement this according to test spec (for creating iterable)
    if (this._done) return true;
    if (this.users.length === 0) this._done = true;
    return false;
  }
}
/* eslint-enable no-underscore-dangle, class-methods-use-this */

// 4 (*) (Q7 in tests)
const fibonacci = {
  [Symbol.iterator]() {
    let prev = 0;
    let cur = 1;
    return {
      next() {
        const next = prev + cur;
        prev = cur;
        cur = next;
        return { value: next, done: false };
      },
    };
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
function isIterableEmpty(iterable) {
  const iterator = iterable[Symbol.iterator]();
  const firstItem = iterator.next();
  return firstItem.done === true;
}

/* 6 (*) (Q9 in tests)
  isIterable([ 1, 2, 3 ]) // true
  isIterable('ABC') // true
  isIterable({ length: 1, 0: 'Alpha' }) // false
  isIterable({ key: 'value' }) // false
  isIterable(new Map()) // true
*/
function isIterable(obj) {
  return typeof obj[Symbol.iterator] === 'function';
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
class Cycled extends Array { }

// 8 (*) (Q11 in tests)
// range(1, 5)
// => [1, 2, 3, 4, 5]
function range() { }

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
