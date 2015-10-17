var starting_board = [
  "00000000000000000000000000000000".split(""),
  "00000000000000000000000000000000".split(""),
  "00000000000000000000000000000000".split(""),
  "00000000000000000000000000000000".split(""),
  "00000000000000000000000000000000".split(""),
  "00000000000000000000000000000000".split(""),
  "00000000001110100000000000000000".split(""),
  "00000000001000000000000000000000".split(""),
  "00000000000001100000000000000000".split(""),
  "00000000000110100000000000000000".split(""),
  "00000000001010100000000000000000".split(""),
  "00000000000000000000000000000000".split(""),
  "00000000000000000000000000000000".split(""),
  "00000000000000000000000000000000".split(""),
  "00000000000000000000000000000000".split(""),
  "00000000000000000000000000000000".split(""),
  "00000000000000000000000000000000".split(""),
]

var WIDTH = 32
var HEIGHT = 16;

function displayBoard(board) {
  board.forEach(function(row, index) {
    console.log(row.join('').replace(/0/g, ".").replace(/1/g, "*"));
  });
}

function clear() {
  console.log("\033[H\033[2J");
}

function nextGen(board) {
  var nextBoard = [];
  board.forEach(function(row, row_index) {
    var nextRow = [];
    row.forEach(function(current, column_index) {
      var result = gen(board, current,  row_index, column_index);
      nextRow.push(result);
    });
    nextBoard.push(nextRow);
  });
  return nextBoard;
}

function gen(board, current, row_index, column_index) {
  var upper_row = (HEIGHT + row_index - 1) % HEIGHT;
  var lower_row = (HEIGHT + row_index + 1) % HEIGHT;
  var left_column = (WIDTH + column_index - 1) % WIDTH;
  var right_column = (WIDTH + column_index + 1) % WIDTH;

  var neighbours = parseInt(board[upper_row][left_column], 10) +
                   parseInt(board[upper_row][column_index], 10) +
                   parseInt(board[upper_row][right_column], 10) +
                   parseInt(board[row_index][left_column], 10) +
                   parseInt(board[row_index][right_column], 10) +
                   parseInt(board[lower_row][left_column], 10) +
                   parseInt(board[lower_row][column_index], 10) +
                   parseInt(board[lower_row][right_column], 10);
  if(neighbours === 3) {
    return '1';
  } else if(neighbours === 2 && current === '1') {
    return '1';
  } else {
    return '0';
  }
}

count = 0;
function loop() {
  clear();
  console.log("gen: " + count++);
  board = nextGen(board);
  displayBoard(board);
  setTimeout(loop, 250);
}

displayBoard(board);
loop();
