#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void main() {
    FILE *fp=NULL;
    char str[10];
    fp = fopen("abc.txt","r");
    if(fp == NULL) {
        printf("Error");
        exit(1);
    }

    // printf("Enter the string\n");
    while(!feof(fp)) {
    fgets(str, sizeof(str), fp);
    printf("%s",str);

    }
    // fprintf(fp,"%d %s", a, str); 
    // fputs(str, fp);
    // for(int i = 0; i != strlen(str); i++) {
    //     fputc(str[i],fp);
    // }

    fclose(fp);
}