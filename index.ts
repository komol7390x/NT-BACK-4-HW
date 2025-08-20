// ----------------------------------------------
// 1
abstract class Trasport {
    abstract move(): void
}

class Car extends Trasport {
    move(): void {
        console.log('Car is moving on road');
    }
}

class Bike extends Trasport {
    move(): void {
        console.log('Bike is moving fast');
    }
}

class Plane extends Trasport {
    move(): void {
        console.log('Plane is flying');
    }
}

const car = new Car()
const bike = new Bike()
const plane = new Plane()

// car.move()
// bike.move()
// plane.move()

// ----------------------------------------------
// 2
abstract class Area {
    abstract area(): void
}

class Circle extends Area {
    public Radius: number
    constructor(Radius: number) {
        super()
        this.Radius = Radius
    }
    area(): void {
        console.log(`Circle area: ${(3.14 * this.Radius * this.Radius).toFixed(2)}`)
    }
}

class Rectangle extends Area {
    width: number
    hight: number
    constructor(width: number, hight: number) {
        super()
        this.hight = hight
        this.width = width
    }

    area(): void {
        console.log('Rectangle area: ' + `${(this.width * this.hight).toFixed(1)}`);
    }
}

class Triangle extends Area {
    first: number
    second: number
    third?: number
    constructor(first: number, second: number, third?: number) {
        super()
        this.first = first
        this.second = second
        this.third = third
    }
    area(): void {
        if (this.third) {
            const perimetr = (this.first + this.second + this?.third) / 2
            const area = Math.sqrt(perimetr * (perimetr - this.first) * (perimetr - this.second) * (perimetr - this.third))
            console.log('Triangle area:' + area);
        } else {
            const result = 1 / 2 * this.first * this.second
            console.log('Triangle area:' + result);
        }

    }
}
const shape: Area[] = [
    new Circle(3),
    new Rectangle(3, 4),
    new Triangle(3, 4, 5)
]
for (let item of shape) {
    // item.area()
}
// ----------------------------------------------
// 3
abstract class Animal {
    abstract makeSound(): void
}

class Dog extends Animal {
    makeSound(): void {
        console.log('Wow wow');
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log('meow ,meow');
    }
}

class Cow extends Animal {
    makeSound(): void {
        console.log('moooow,moooow');
    }
}
const animal: Animal[] = [
    new Dog(),
    new Cat(),
    new Cow()
]
for (let item of animal) {
    // item.makeSound()
}
// ----------------------------------------------
// Utils Type
// 1-Required
interface IUser {
    name: string,
    email?: string,
    password?: string,
    age?: number
}
const userRequired: Required<IUser> = {
    name: 'Bekzod',
    email:'www.bek@gmail,com',
    password:'password123',
    age:25
}
// console.log(userRequired);
// ----------------------------------------------
// 4-Partials

const updateProfile=(updates:Partial<IUser>):IUser=>{
    const update={...userRequired,...updates}
    return update
}
// console.log(updateProfile({name:'Sherzod'}));
// console.log(updateProfile({age:30,email:'sherka1233@gmail.com'}));
// ----------------------------------------------
// 5-Pick & Omit
