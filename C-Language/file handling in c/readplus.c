#include <stdio.h>
#include <stdlib.h>

void main() {
    FILE *fp = NULL;
    fp = fopen("abc.txt","r+");
    if(fp == NULL) {
        printf("Error");
        exit(1);
    }
    fputs("Mayur is cool",fp);
    fputc('P',fp);
    fclose(fp);
}