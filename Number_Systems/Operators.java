public class Operators {
    public static void main(String[] args) {
        // Q1: Given a number, find it is even or odd.
        /* int num = 7;
        if ((num & 1) == 1) {
            System.out.println("Odd");
        } else {
            System.out.println("Even");
            } */

        // Q2: Find unique
        int[] arr = {2,3,4,5,6,5,4,3,2};
        int unique = 0;
        for(int n: arr) {
            unique = unique ^ n;
        }
        System.out.println(unique);
    }
}
