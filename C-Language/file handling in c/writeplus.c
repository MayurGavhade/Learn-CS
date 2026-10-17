#include <stdio.h>
#include <stdlib.h>

void main() {
    FILE *fp = NULL;
    char str[20];
    fp = fopen("abc.txt","w+");
    if(fp == NULL) {
        printf("Can't open file");
        exit(1);
    }
    fputs("Mayur is GOAT", fp);
    rewind(fp);
    while(!feof(fp)) {
        printf("%s", fgets(str,sizeof(str),fp));
    }
    fclose(fp);
}