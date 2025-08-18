// Bonus savollar

import { it } from "node:test";

// 1
const fibonacci = (n: number): number[] => {
    if (n <= 0) return [];
    const fibo: number[] = [0];
    if (n === 1) return fibo;
    fibo.push(1);
    for (let i = 2; i < n; i++) {
        fibo.push(fibo[i - 1] + fibo[i - 2]);
    }
    return fibo;
}
const result1 = fibonacci(5)
// console.log(result1);
// -------------------------------------------------------
// 2
type Product = {
    id: number,
    name: string,
    price: number,
    inStock: number
}

const products = (arr: Product[]): object => {
    return arr.filter(item=>item.price>100)
}
const productInfo = [
    { id: 1, name: 'Olma', price: 500, inStock: 100 },
    { id: 2, name: 'Banan', price: 75, inStock: 80 },
    { id: 3, name: 'Uzum', price: 100, inStock: 60 },
    { id: 4, name: 'Anor', price: 60, inStock: 40 },
    { id: 5, name: 'Nok', price: 125, inStock: 50 }
]
const result2=products(productInfo)
console.log(result2);
