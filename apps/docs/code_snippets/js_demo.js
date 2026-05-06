console.log("Hello, World!");

var a;
let b = 10;
const PI = 3.14;

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    // Method
    calcArea() {
        return this.height * this.width;
    }
}

const jsonData = {
  name: "John Doe",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York"
  },
  hobbies: ["reading", "hiking"]
};

// Prettify the JSON data with an indentation of 2 spaces
const prettifiedJSON = JSON.stringify(jsonData, null, 2);

console.log(prettifiedJSON);