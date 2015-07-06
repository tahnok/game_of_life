package main

import (
  "fmt"
  "io/ioutil"
  "time"
  "strings"
)

const size int = 32

func main() {
  var board [size][size]int

  board = parse_board("board.txt")
  for i:= 0; true; i++ {
    display_board(board, i)
    board = next_gen(board)
    time.Sleep(time.Second)
  }

}

func display_board(board [size][size]int, gen int) {
  clear()
  for _, row := range(board) {
    for _, item := range(row) {
      if item == 1 {
        fmt.Print("*")
      } else {
        fmt.Print(".")
      }
    }
    fmt.Print("\n")
  }
  fmt.Print("Generation ", gen)
}

func clear() {
  fmt.Print("\033[H\033[2J")
}

func next_gen(current [size][size]int) [size][size]int {
  var next [size][size]int

  for row_index, row := range (current) {
    for column_index, item := range(row) {
      above := (row_index - 1 + size) % size
      below := (row_index + 1) % size
      left := (column_index - 1 + size) % size
      right := (column_index + 1) % size

      sum := current[above][left] +
             current[above][column_index] +
             current[above][right] +
             current[row_index][left] +
             current[row_index][right] +
             current[below][left] +
             current[below][column_index] +
             current[below][right]
      if sum == 3 {
        next[row_index][column_index] = 1
      } else if sum == 2 && item == 1 {
        next[row_index][column_index] = 1
      }
    }
  }
  return next
}

func seed() [size][size]int {
  var board [size][size]int
  board[3][1] = 1
  board[3][2] = 1
  board[3][3] = 1

  return board
}

func parse_board(path string) [size][size]int {
  var board [size][size]int
  data, err := ioutil.ReadFile(path)
  if err != nil {
    panic(err)
  }
  lines := strings.Split(string(data), "\n")
  for row, line := range(lines) {
    for column, char := range(line) {
      if char == '.' {
        board[row][column] = 0
      } else if char == '*' {
        board[row][column] = 1
      } else {
        panic("unexpected char")
      }
    }
  }
  return board
}
