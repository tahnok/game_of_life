var starting_board = [
  "00000000000000000000000000000000",
  "00000000000000000000000000000000",
  "00000000000000000000000000000000",
  "00000000000000000000000000000000",
  "00000000000000000000000000000000",
  "00000000000000000000000000000000",
  "00000000001110100000000000000000",
  "00000000001000000000000000000000",
  "00000000000001100000000000000000",
  "00000000000110100000000000000000",
  "00000000001010100000000000000000",
  "00000000000000000000000000000000",
  "00000000000000000000000000000000",
  "00000000000000000000000000000000",
  "00000000000000000000000000000000",
  "00000000000000000000000000000000",
  "00000000000000000000000000000000",
]

var HEIGHT = starting_board.length;
var WIDTH = starting_board[0].length;

function generate_board_from_seed(seed) {
  var board = [];
  seed.forEach(function(row) {
    board.push(row.split('').map(function(i) { return parseInt(i, 10); }));
  });
  return board;
}

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

  var neighbours = board[upper_row][left_column] +
                   board[upper_row][column_index] +
                   board[upper_row][right_column] +
                   board[row_index][left_column] +
                   board[row_index][right_column] +
                   board[lower_row][left_column] +
                   board[lower_row][column_index] +
                   board[lower_row][right_column];
  if((neighbours === 3) ||
    (neighbours === 2 && current === 1)) {
    return 1;
  } else {
    return 0;
  }
}

var count = 0;
var board = generate_board_from_seed(starting_board);
function loop() {
  clear();
  console.log("gen: " + count++);
  board = nextGen(board);
  displayBoard(board);
  setTimeout(loop, 250);
}

displayBoard(board);
loop();
