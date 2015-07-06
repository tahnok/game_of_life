#include <stdio.h>
#include <stdlib.h>
#define SIZE 32

void display_board(char **);
void zero();
char **setup();


int main() {
  char **current_board = setup();

  int i;
  for(i = 0; i < 40; i++) {
    display_board(current_board);
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

void zero() {
  printf("hi");
}

char **setup() {
  char **board = calloc(SIZE, sizeof(char *));
  int i;
  for(i = 0; i < SIZE; i++) {
    board[i] = calloc(SIZE, sizeof(char));
  }

  board[2][1] = 1;
  board[2][2] = 1;
  board[2][3] = 1;
  return board;
}
