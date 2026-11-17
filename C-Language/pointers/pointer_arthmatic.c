#include <stdio.h>

int main() {
    // for pointer *p
    // p + n = p + n * sizeof(*p);

    // on array
    int a[5] = {0,1,-1,10,1};
    int *p = &a[0];

    printf("%d", *(p+2)); // print -1
    return 0;
}