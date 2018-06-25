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
          step += 1;
          while (step <= 5) {
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
    let index = 0;
    const returnedArray = [];

    returnedArray.push(this.users[index]);
    index += 1;
    return returnedArray;
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
    let b = 1;
    return {
      next() {
        const current = b;
        b = a;
        a += current;
        return { value: current, done: false };
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
function isIterableEmpty(container) {
  const iterator = container[Symbol.iterator]();
  const { done } = iterator.next();

  if (done) {
    return true;
  }
  return false;
}

/* 6 (*) (Q9 in tests)
  isIterable([ 1, 2, 3 ]) // true
  isIterable('ABC') // true
  isIterable({ length: 1, 0: 'Alpha' }) // false
  isIterable({ key: 'value' }) // false
  isIterable(new Map()) // true
*/
function isIterable(container) {
  return typeof container[Symbol.iterator] === 'function';
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
class Cycled extends Array {
  constructor(arr) {
    super();
    this.arr = arr;
    this.currentIndex = 0;
  }
  step(stepCount) {
    this.currentIndex = (this.currentIndex + stepCount) % this.arr.length;

    if (this.currentIndex < 0) {
      this.currentIndex = this.arr.length + this.currentIndex;
    }
    return this.arr[this.currentIndex];
  }

  current() {
    return this.step(0);
  }
  next() {
    return this.step(1);
  }
  previous() {
    return this.step(-1);
  }
}

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
