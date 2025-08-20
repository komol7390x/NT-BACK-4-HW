// 1 Mini e-commerce
abstract class Product {
  name: string;
  price: number;
  abstract getDiscount(): void;
}
class Clothes extends Product {
  constructor(name: string, price: number) {
    super();
    (this.name = name), (this.price = price);
  }
  getDiscount(): void {
    console.log(
      `Nomi: ${this.name}\nNarxi: ${this.price}\nChegirma: ${this.price * 0.7}`
    );
  }
}

class Electronics extends Product {
  constructor(name: string, price: number) {
    super();
    (this.name = name), (this.price = price);
  }
  getDiscount(): void {
    console.log(
      `Nomi: ${this.name}\nNarxi: ${this.price}\nChegirma: ${this.price * 0.9}`
    );
  }
}

class Books extends Product {
  constructor(name: string, price: number) {
    super();
    (this.name = name), (this.price = price);
  }
  getDiscount(): void {
    console.log(
      `Nomi: ${this.name}\nNarxi: ${this.price}\nChegirma: ${this.price * 0.6}`
    );
  }
}

type AllProducts = "clothes" | "electronics" | "books";
const products: Record<AllProducts, Product[]> = {
  clothes: [new Clothes("Shuba", 500)],
  electronics: [new Electronics("Samsung", 800)],
  books: [new Books("Harry Potter", 20)],
};
for (let key of Object.keys(products)) {
  // products[key][0].getDiscount()
  //   console.log("-------------------");
}
// ---------------------------------------------------------------------------------------
// 2
abstract class IUser {
  name: string;
  email: string;
  password: string;
  age: number;
}
const userRequired: Required<IUser> = {
  name: "Saloh",
  email: "www.ssloh@gmail.com",
  password: "1234",
  age: 22,
};
// console.log(userRequired);
const updateProfile = (data: Partial<IUser>): IUser => {
  const newUpdate = { ...userRequired, ...data };
  return newUpdate;
};

// console.log(updateProfile({ email: "www.saloh1@gmail.com" }));
const userPick: Pick<IUser, "email" | "name"> = {
  email: "www.rashid@gmail.com",
  name: "Rashid",
};
// console.log(userPick);
// ---------------------------------------------------------------------------------------
// 3

abstract class Shape {
  abstract area(): number | undefined;
}
class Circle extends Shape {
  public radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }
  area(): number | undefined {
    if (typeof this.radius == "number") {
      return 3.14 * this.radius * this.radius;
    }
  }
}
const circle = new Circle(3);
type circleType = ReturnType<typeof circle.area>;
type circleParam = Parameters<typeof circle.area>;
const result: circleType = 3;
const result1: circleParam = [];
// console.log(result);
// console.log(result1);

