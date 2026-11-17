#include <string.h>
#include <stdio.h>

void main() {
    // scanf dont consider spaces in string

    // use gets function 

    char str[30];
    puts(str);
    printf("%s", str);

    // drawback of both gets and scanf function is buffer overflow
    // overwrite the memory next to last memory cell str array
    // if critical info is saved in that memory ,that will overwrite

    //better to use fgets() function
    fputs(str,stdin);
    printf("%s", str);
}