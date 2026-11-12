/* 
? what is widgets
* can be think of components which can contain more than one widget itself
* it describe the structure of widgets in a app

* example -> text, button, row, column, & image widgets
* can pass property to these widgets also
*/

String name = "Mayur Gavhade";
void main() {
  //   print("hello ${name}");
  // ! dynamic variable in dart language
  // * the dynamic type is a special data type that allows
  // * a variable to change its type after it has been declared
  dynamic name = "Mayur";
  print(name);

  name = 30;
  print(name);

  print(getName(5));
  print(getName(-3));

  print(greetPerson());

  // ! construct a new object from car class
  Car bmw = new Car();
  bmw.fuel = 20;
  bmw.name = "new model of bmw";
  print(bmw.info());

  /*
! Lists in dart
* used to store a particular type of data or different datatypes as it contains dynamic in a continues order
 */

  List names = ["Mayur", "Gavhade", "is"];
  names.add("Cool!");
  names.remove("Gavhade");
  names.add(1000);
  print(names);

  // ! if we wanted to make list such as it should only contain a particular datatype
  // * use <> after List , see below example

  List<int> nums = [10, 20, 30, 40];
  nums.add(50);
  //* nums.add("Mayur"); <- this should give error as introducing string to int list
  print(nums);
}

// * function or method
String getName(int num) {
  if (num > 0)
    return "Positve";
  else
    return "Negative or maybe Zero";
}

String greetPerson() => "Hi there";

// ! class to instruct a object

class Car {
  int fuel = 10;
  String name = "lambo";

  void init(int fuel, String name) {
    this.fuel = fuel;
    this.name = name;
  }

  String info() {
    return "fuel: ${fuel} and name: $name";
  }
}
