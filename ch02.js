// Chessboard

let length = 8;
let height = 20;

let grid = '';

for (let i = 0; i < height; i++) {
	for (let j = 0; j < length; j++) {
    	if ((i + j) % 2 === 0) {
        	grid += ' ';
        } else {
        	grid += '#';
        }
    }
  	grid += '\n';
}

console.log(grid);