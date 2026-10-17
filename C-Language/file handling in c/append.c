#include <stdio.h>
#include <stdlib.h>

void main() {
    FILE *fp = NULL;
    char str[10];
    fp = fopen("ac.txt","a");
    if(fp == NULL) {
        printf("Error");
        exit(1);
    }
    printf("Enter the text to add\n");
    fgets(str, sizeof(str), stdin);
    fputs(str,fp);

    fclose(fp);
}