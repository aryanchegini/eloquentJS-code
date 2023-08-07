const SCRIPTS = require('./scripts.js');

//Flattening:

let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
// → [1, 2, 3, 4, 5, 6]

console.log(
  arrays.reduce((flattenedArray, subArray) => {
    return flattenedArray.concat(subArray);
  }, [])
);

// Your own loop:
function loop(value, test_f, update_f, body_f) {
  while (test_f(value)) {
    body_f(value);
    value = update_f(value);
  }
}

loop(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log
);
// → 3
// → 2
// → 1

// Everything:
function every(arr, test_f) {
  for (let item of arr) {
    if (!test_f(item)) return false;
  }
  return true;
}

function some(arr, test_f) {
  for (let item of arr) {
    if (test_f(item)) return true;
  }
  return false;
}

function everyUsingSome(arr, test_f) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (!(!some(arr, test_f) || !some(arr.slice(i + 1, arr.length), test_f))) {
      continue;
    } else return false;
  }
  return true;
}

console.log(everyUsingSome([1, 3, 5], (n) => n < 10));
// → true
console.log(everyUsingSome([2, 4, 16], (n) => n < 10));
// → false
console.log(everyUsingSome([], (n) => n < 10));
// → true

//Dominant writing direction:



function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let direction = groupName(item);
    let known = counts.findIndex((c) => c.direction == direction);
    if (known == -1) {
      counts.push({ direction, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function dominantDirection(text) {
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({ direction }) => direction != "none");

  if (scripts.length === 1) return scripts[0].direction;
  else if (scripts.length > 1) {
    return scripts.sort((a, b) => (a.count > b.count ? -1 : 1))[0].direction;
  }
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
