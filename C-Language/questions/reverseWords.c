#include <stdio.h>

void main()
{
    // * given that str = "Hello World";
    char str[] = "Hello World";

    int p = 0, counter = 0;
    while (str[p] != '\0')
    {
        while (str[p] != ' ')
        {
            counter++;
            p++;
        }
        int i = 0, j = counter;
        p = 0;
        while (p != counter / 2)
        {
            char temp = str[i];
            str[i] = str[j];
            str[j] = temp;
            j--;
            i++;
            p++;
        }
        p = counter;
        printf("p: %d, str[p]: %c, counter: %d\n",p,str[p],counter);
    }

    for (int s = 0; s <= counter; s++)
    {
        printf("%c", str[s]);
    }
}