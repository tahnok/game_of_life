#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#define SIZE 32

void display_board(char **);
char **setup();
char **next_generation(char **);
int sum(int, int, char **);


int main() {
  char **current_board = setup();
  char **nextboard;

  current_board[2][1] = 1;
  current_board[2][2] = 1;
  current_board[2][3] = 1;

  int i;
  for(i = 0; i < 40; i++) {
    display_board(current_board);
    nextboard = next_generation(current_board);
    free(current_board);
    current_board = nextboard;
  }
}

void display_board(char **board) {
  printf("\033[H\033[2J");
  int row, column;
  for(row = 0; row < SIZE; row++) {
    for(column = 0; column < SIZE; column++) {
      printf(board[row][column] ? "*" : ".");
    }
    printf("\n");
  }
}

char **setup() {
  char **board = calloc(SIZE, sizeof(char *));
  int i;
  for(i = 0; i < SIZE; i++) {
    board[i] = calloc(SIZE, sizeof(char));
  }
  return board;
}

char **next_generation(char **board) {
  char **nextgen = setup();
  int row, column;
  for(row = 0; row < SIZE; row++) {
    for(column = 0; column < SIZE; column++) {
      int thing = sum(row,column,board);
      if(thing == 3) {
        nextgen[row][column] = 1;
      } else if(thing == 2 && board[row][column] == 1) {
        nextgen[row][column] = 1;
      }
    }
  }

  return nextgen;
}

int sum(int row, int column, char **board) {
  int above = (row + 1) % SIZE;
  int below = (row - 1 + SIZE) % SIZE;
  int left = (column - 1 + SIZE) % SIZE;
  int right = (column + 1) % SIZE;

  int total = board[above][left] +
    board[above][column] +
    board[above][right] +
    board[row][left] +
    board[row][column] +
    board[row][right] +
    board[below][left] +
    board[below][column] +
    board[below][right];

  return total;
}
