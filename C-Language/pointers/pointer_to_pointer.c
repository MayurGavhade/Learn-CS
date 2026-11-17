#include <stdio.h>

int main() {
    int a = 10;
    int *p = &a; // single pointer
    int **q = &p; // double pointer
    int ***r = &q; // third pointer

    printf("pointer address = %p \n", r);
    printf("pointer address = %p \n", q);
    printf("pointer address = %p \n", p);
    printf("pointer address = %x \n", &a);
    return 0;
}