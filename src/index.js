/* 1 (*)
Create an iterable without using generator function.
See the tests for this function to get the spec.
*/
function simpleIterable() {
  const iterable = {
    [Symbol.iterator]() {
      let num = 0;
      const iterator = {
        next() {
          num += 1;
          if (num > 5) {
            return {
              value: undefined,
              done: true,
            };
          }
          return {
            value: num,
            done: false,
          };
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
  let num = 1;
  while (num <= 5) {
    yield num;
    num += 1;
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
    if (this.users.length > 0) {
      const [firstUser, ...restUsers] = this.users;
      this.users = restUsers;
      return `user: ${firstUser}`;
    }
    this._done = true;
    return undefined;
  }
  get done() {
    // Implement this according to test spec (for creating iterable)
    return this._done;
  }
}
/* eslint-enable no-underscore-dangle, class-methods-use-this */

// 4 (*) (Q7 in tests)
// const fibonacci = {};
function* generateFibonacci() {
  let f1 = 0;
  yield f1;
  let f2 = 1;
  yield f2;
  let currentValue = 1;

  while (true) {
    currentValue = f1 + f2;
    yield currentValue;
    f1 = f2;
    f2 = currentValue;
  }
}
const fibonacci = generateFibonacci();

// 5 (*) (Q8 in tests)
/*
  isIterableEmpty([]);
  //=> true

  isIterableEmpty(new Set([1, 2]));
  //=> false

  Do not use Array.from()
*/
function isIterableEmpty(iterable) {
  return iterable[Symbol.iterator]().next().done;
}

/* 6 (*) (Q9 in tests)
  isIterable([ 1, 2, 3 ]) // true
  isIterable('ABC') // true
  isIterable({ length: 1, 0: 'Alpha' }) // false
  isIterable({ key: 'value' }) // false
  isIterable(new Map()) // true
*/
function isIterable(iterable) {
  return typeof iterable[Symbol.iterator] === 'function';
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
