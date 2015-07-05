#include <stdio.h>
#define SIZE 32

void display_board(char **);
void zero();


int main() {
  char **current_board;

  int i;
  for(i = 0; i < 40; i++) {
    display_board(current_board);
  }
}

void display_board(char **board) {
  printf("board");
}

void zero() {
  printf("hi");
}
