console.log("Hello, World!");

//声明
var varStuff = 10;
let letStuff = 20;
const constStuff = 30;

// 单行注释

/* 这是一个更长的，
 * 多行注释
 */

//const 声明总是需要初始化器，因为它们禁止在声明后进行任何类型的赋值

//模板字面量

// 创建基本的字符串字面量
`在 JavaScript 中，“\n” 是换行符。`

  // 多行字符串
  `在 JavaScript 中，模板字符串可以
 跨越行，但是由双引号和单引号
 包裹的字符串不行。`

// 字符串插值
const name = 'Lev', time = 'today';
`你好 ${name},${time} 过得怎么样？`

var o = { a: "foo", b: "bar", c: 42 };

// ES6 中的简略表示方法
var a = "foo",
  b = "bar",
  c = 42;
var o = { a, b, c };

// 真假值
/*  
 *  以下是 JavaScript 中的假值：
 *  - false
 *  - 0
 *  - -0
 *  - 0n (BigInt 的零值)
 *  - "" (空字符串)
 *  - null
 *  - undefined
 *  - NaN (Not-a-Number)
 *
 *  除了上述假值之外的所有值都是 JavaScript 中的真值。  
 */

var truthyValue = undefined || "default value";
truthyValue = null;
//解构


const arr = [3, 5, 7];
arr.foo = "hello";

for (const i in arr) {
  console.log(i); // 输出 "0", "1", "2", "foo"
}

for (const i of arr) {
  console.log(i); // 输出 "3", "5", "7"
}

// 注意 for...of 的输出没有出现 "hello"

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(rest);
// 期望输出：Array [30, 40, 50]

const obj = { prop1: x, prop2: y, prop3: z };
const { prop1: x, prop2: y, prop3: z } = obj;
// 等同于：
// const x = obj.prop1, y = obj.prop2, z = obj.prop3;

function square(number) {
  return number * number;
}

//arguments 变量只是“类数组”，而不是数组。它与数组类似，有索引编号和 length 属性。尽管如此，
// 它并不具备 Array 对象的所有数组操作方法。

const colors = ["red", "green", "blue"];
colors.forEach((color) => console.log(color));

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

class MyClass {
  // 构造函数
  constructor() {
    // 构造函数主体
  }
  // 实例字段
  myField = "foo";
  // 实例方法
  myMethod() {
    // myMethod 主体
  }
  // 静态字段
  static myStaticField = "bar";
  // 静态方法
  static myStaticMethod() {
    // myStaticMethod 主体
  }
  // 静态块
  static {
    // 静态初始化代码
  }
  // 字段、方法、静态字段、静态方法、静态块都可以使用“私有”形式
  #myPrivateField = "bar";
}