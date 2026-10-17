#include <stdio.h>
#include <stdlib.h>

void main() {
    FILE *fp = NULL;
    char str[20];

    fp = fopen("abc.txt","a+");
    if(fp == NULL) {
        printf("Error");
        exit(1);
    }
    fputs(" Mayur", fp);
    rewind(fp);
    while(!feof(fp)) {
        char ch = fgetc(fp);
        printf("%c",ch);
    }
    fclose(fp);
}