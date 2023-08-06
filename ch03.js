//Min:

function min(a, b) {
	return a<=b ? a:b
}

//Recursion:

let isEven = function(num) {
	if (Math.abs(num) == 0) return true;
  	if (Math.abs(num) == 1) return false;
  	return isEven(Math.abs(num) - 2)
}


//Bean counting:

function countChar(str, char) {
	let count = 0
	for (let i = 0; i < str.length; i++) {
    	if (str[i] === char) {
        	count++;
        }
    }
  	return count;
}

function countBs(str) {
	return countChar(str, 'B')
}
