export {}
let message = 'Welcome back';
console.log(message);

let x = 10;
const y = 20;

let sum;
const title = "Codevolution";

let isBeginner: boolean = true;
let total: number = 0;
let name: string = "Luke";

let sentence: string = `My name is ${name}
I am a beginner in TypeScript`;

console.log(sentence);

let n: null = null;
let u: undefined = undefined;

let isNe: boolean = null;
let myName: string = undefined;

let list1: number[] = [1,2,3];
let list2: Array<number> = [1,2,3];


let person1: [string, number] = ['Chris', 22];

enum Color {Red, Green, Blue};

let c: Color = Color.Green;
console.log(c);

let randomValue: any = 10;
randomValue = true;
randomValue = 'Luke';

let myVariable: unknown = 10;

function hasName(obj: any): obj is {name: string} {
    return !!obj &&
        typeof obj === "object" &&
        "name" in obj
}

if (hasName(myVariable)) {
    console.log(myVariable.name);
}

function add(num1: number, num2: number = 5): number {
    if(num2)
        return num1 + num2;
    else
        return num1;
    
}
add(5, 10);
add(5);

interface Person {
    firstName: string;
    lastName: string;
}

function fullName(person: Person) {
    console.log(`${person.firstName} ${person.lastName}`);
}


let p = {
    firstName: 'Bruce',
    lastName: 'Wayne'
}



fullName(p);

class Employee {
    employeeName: string;

    constructor (name: string) {
        this.employeeName = name;
    }

    greet() {
        console.log(`Good morning ${this.employeeName}`);
    }
}

let emp1 = new Employee('Luke');
console.log(emp1.employeeName);
emp1.greet();

//manager class inherits from Employee class

class Manager extends Employee {
    constructor(managerNAme: string) {
        // 'super' keyword assigns value to employeeName by its constructor
        super(managerNAme);
    }
    delegateWork() {
        console.log("Manager delegating tasks");
    }
}

let m1 = new Manager('Bruce');
m1.delegateWork();
m1.greet();
console.log(m1.employeeName);