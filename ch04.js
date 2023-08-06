// //Reversing An Array:

// function reverseArray(arr) {
//   let newArr = [];
//   for (let item of arr) {
//     newArr.unshift(item);
//   }
//   return newArr;
// }

// function reverseArrayInPlace(arr) {
//   let i = 0, j = arr.length - 1;
//   while (i<j) {
//     [arr[i], arr[j]] = [arr[j], arr[i]]; 
//     i++;
//     j--;
//   }
// }

// //A List:

// function arrayToList(arr) {
//   let list = null
//   for (let i = arr.length - 1; i >= 0; i--) {
//     list = {value: arr[i], rest: list};
//   }
//   return list;
// }

// function listToArray(list) {
//   let arr = [];
//   let section = list;
//   while (section !== null) {
//     arr.push(section.value);
//     section = section.rest;
//   }
//   return arr
// }

// function prepend(list, element) {
//   return {value: element, rest: list}
// }

// function nth(list, n) {
//   if (list === null) return undefined;
//   if (n < 0) return undefined;
//   if (n == 0) return list.value;
//   else {return nth(list.rest, n-1)}
// }