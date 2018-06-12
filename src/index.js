/* 1 (*)
Create an iterable without using generator function.
See the tests for this function to get the spec.
*/

function simpleIterable() {
  const iterable = {
    [Symbol.iterator]() {
      let step = 0;
      const iterator = {
        next() {
          if (step <= 4) {
            step += 1;
            return { value: step, done: false };
          }
          return { value: undefined, done: true };
        },
      };
      return iterator;
    },
  };
  return iterable;
}

/* 2 (*)
Create an iterable using generator function.
It should have the same functionality as the one in question 1
*/
function* generatorIterable() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
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
  /* [Symbol.iterator]() {
    // let one = 0, two=1, i=1;

   const iterator = {
    next() {
        if (i <= 10) {
          return { value: one + two, done: false };
          one = two;
          two = one + two;
        }
        return { value: undefined, done: true };
      }
    }
  } */
};

// 5 (*) (Q8 in tests)
/*
  isIterableEmpty([]);
  //=> true

  isIterableEmpty(new Set([1, 2]));
  //=> false

  Do not use Array.from()
*/
function isIterableEmpty() {}

/* 6 (*) (Q9 in tests)
  isIterable([ 1, 2, 3 ]) // true
  isIterable('ABC') // true
  isIterable({ length: 1, 0: 'Alpha' }) // false
  isIterable({ key: 'value' }) // false
  isIterable(new Map()) // true
*/
function isIterable() {}

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
