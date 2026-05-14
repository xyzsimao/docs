class Person{
    name:string; // 这个是对后文this.name类型的定义
    age:number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    print(){
        return this.name + this.age;
    }
}

let person:Person = new Person('muyy',23)
console.log(person.print()) // muyy23

class Student extends Person{
    gender:string;
    constructor(gender:string){
        super("muyy",23);
        this.gender = gender;
    }
    tell(){
        console.log(this.name + this.age + this.gender);
    }
}

interface LabelValue{
    label: string;
}

function printLabel(labelObj: LabelValue){
    console.log(labelObj.label);
}

let myObj = {
    "label":"hello Interface"
};
printLabel(myObj);

interface Person1{
    name?:string;
    age?:number;
}

function printInfo(info:Person1){
    console.log(info);
}

let info = {
    "name":"muyy",
    "age":23
};

printInfo(info); // {"name": "muyy", "age": 23}

let info2 = {
    "name":"muyy"
};

printInfo(info2); // {"name": "muyy"}

interface Point2D {
    x: number;
    y: number;
}
interface Point3D {
    x: number;
    y: number;
    z: number;
}
var point2D: Point2D = { x: 0, y: 10 }
var point3D: Point3D = { x: 0, y: 10, z: 20 }
function iTakePoint2D(point: Point2D) { /* do something */ }

iTakePoint2D(point2D); // exact match okay
iTakePoint2D(point3D); // extra information okay
// @ts-ignore
iTakePoint2D({ x: 0 }); // Error: missing information `y`