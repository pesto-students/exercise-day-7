/* 1 (*)
Create an iterable without using generator function.
See the tests for this function to get the spec.
*/
function simpleIterable() {
  const iterable = {
    [Symbol.iterator]() {
      return {
        x: 0,
        next() {
          while (this.x < 5) {
            // return { value: this.x, done: false };
            this.x += 1;
            return { value: this.x, done: false };
          }
          return { value: undefined, done: true };
        },
      };
    },
  };
  return iterable;
}

/* 2 (*)
Create an iterable using generator function.
It should have the same functionality as the one in question 1
*/
function* generatorIterable() {
  let x = 1;
  while (x < 6) {
    yield x;
    x += 1;
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
    const obj = {
      value: undefined,
      done: false,
    };
    if (this.users.length > 0) {
      this.users.splice(0, 1);
      obj.value = `user: ${this.users[0]}`;
      obj.done = this._done;
    }
    this._done = true;
    return obj;
  }
  get done() {
    // Implement this according to test spec (for creating iterable)
    return !this._done;
  }
}
/* eslint-enable no-underscore-dangle, class-methods-use-this */

// 4 (*) (Q7 in tests)
const fibonacci = {
  [Symbol.iterator]() {
    let a = 0;
    let b = 1;
    //  let c = a + b;
    return {
      next() {
        const c = a + b;
        a = b;
        b = a;
        return { value: c, done: false };
        // return { value: undefined, done: true};
      },
      // return iterator;
    };
    // return iterable;
    // return iterator;
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
function isEmpty(obj) {
  // eslint-disable-next-line
  for(var key in obj) {
    // eslint-disable-next-line
    if(obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
function isIterableEmpty(arg) {
  if (arg == null || isEmpty(arg)) {
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
function isIterable(args) {
  // const iterator = args[Symbol.iterator]();
  const iterator = args[Symbol.iterator];
  if (typeof iterator === 'function') {
    return true;
  }
  return false;
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
function* range(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('undefined is not a number');
  }
  let x = a;
  while (x <= b) {
    yield x;
    x += 1;
  }
}

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
