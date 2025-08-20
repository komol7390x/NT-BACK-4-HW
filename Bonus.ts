// 1 Mini e-commerce
abstract class Product {
    name: string
    price: number
    abstract getDiscount(): void
}
class Clothes extends Product {
    constructor(name: string, price: number) {
        super()
        this.name = name,
            this.price = price
    }
    getDiscount(): void {
        console.log(`Nomi: ${this.name}\nNarxi: ${this.price}\nChegirma: ${this.price * 0.7}`);
    }
}

class Electronics extends Product {
    constructor(name: string, price: number) {
        super()
        this.name = name,
            this.price = price
    }
    getDiscount(): void {
        console.log(`Nomi: ${this.name}\nNarxi: ${this.price}\nChegirma: ${this.price * 0.9}`);
    }
}

class Books extends Product {
    constructor(name: string, price: number) {
        super()
        this.name = name,
            this.price = price
    }
    getDiscount(): void {
        console.log(`Nomi: ${this.name}\nNarxi: ${this.price}\nChegirma: ${this.price * 0.6}`);
    }
}

type AllProducts="clothes" | "electronics" | "books"
const products:Record<AllProducts,Product[]>={
    clothes:[new Clothes('Shuba',500)],
    electronics:[new Electronics('Samsung',800)],
    books:[new Books('Harry Potter',20)]
}
for(let key of Object.keys(products)){
    products[key][0].getDiscount()
    console.log('-------------------');
}