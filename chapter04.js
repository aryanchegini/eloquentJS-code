//The Sum Of A Range:
function range(start, end, step = start < end ? 1 : -1) {
  let arr = [];
  if (step > 0) {
    for (let i = start; i <= end; i += step) arr.push(i);
  } else {
    for (let i = start; i >= end; i += step) arr.push(i);
  }
  return arr;
}

let sum = (arr) => arr.reduce((total, num) => (total += num), 0);

//Reversing An Array:

function reverseArray(arr) {
  let newArr = [];
  for (let item of arr) {
    newArr.unshift(item);
  }
  return newArr;
}

function reverseArrayInPlace(arr) {
  let i = 0,
    j = arr.length - 1;
  while (i < j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--;
  }
}

//A List:

//VERSION 1:
// function arrayToList(arr) {
//     let list = {value: arr[arr.length - 1], rest: null};
//     for (let i = arr.length - 2; i >= 0; i--) {
//         list = {value: arr[i], rest: list};
//     }
//     return list;
// }

//VERSION 2:
// function arrayToList(arr) {
//     let rest = null
//     let list = {}
//     for (let i = arr.length - 1; i >= 0; i--) {
//         list = {value: arr[i], rest};
//         rest = list
//     }
//     return list;
// }

//VERSION 3: RECURSIVE!!!!!!!!

function arrayToList(arr, list = { value: null, rest: null }) {
  if (arr.length == 1) {
    list.value = arr[0];
    return list;
  } else {
    list.value = arr[arr.length - 1];
    return arrayToList(arr.slice(0, arr.length - 1), {
      value: null,
      rest: list,
    });
  }
}

function listToArray(list, arr = []) {
  if (list.rest == null) {
    arr.push(list.value);
    return arr;
  } else {
    arr.push(list.value);
    return listToArray(list.rest, arr);
  }
}

function prepend(list, element) {
  return { value: element, rest: list };
}

function nth(list, number) {
  if (list === null) return undefined;
  if (number < 0) return undefined;
  if (number == 0) {
    return list.value;
  } else {
    return nth(list.rest, number - 1);
  }
}

console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 1));

// Deep comparison

function deepEqual(a, b) {
  if (a === b) return true;
  else if (a == null || b == null) return false;
  /* use == incase undefined is used. Also helps spot whether keys in both lists
    are identical as if they arent then b[key] would give undefined and hence false
    is returned. Same effect as if (!keysB.includes(key) || !deepEqual(a[key], b[key]))
    return false; */ else if (typeof a === "object" && typeof b === "object") {
    let keysA = Object.keys(a),
      keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  } else return false;
}

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true
