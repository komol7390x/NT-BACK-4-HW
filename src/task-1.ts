const showUser = (data: []): void => {
    for (let item of data) {
        console.log(item);
    }
}
// -------------------------------------------------------------------------------
// 1
type User = {
    id: number,
    fullName: string,
    isActive: boolean,
    role: 'admin' | 'user' | 'guest'
}
const users: User[] = [
    { id: 1, fullName: 'Alisher', isActive: true, role: 'admin' },
    { id: 2, fullName: 'Dilshod', isActive: false, role: 'user' },
    { id: 3, fullName: 'Malika', isActive: true, role: 'guest' },
    { id: 4, fullName: 'Javlon', isActive: true, role: 'user' },
    { id: 5, fullName: 'Gulbahor', isActive: false, role: 'guest' }
]
// showUser(<[]>users)
// -------------------------------------------------------------------------------
// 2 
type Product = {
    name: string,
    price: number,
    discount: number | null
}
const products: Product[] = [
    { name: 'Olma', price: 10, discount: 10 },
    { name: 'Banan', price: 15, discount: null },
    { name: 'Uzum', price: 20, discount: 0 },
    { name: 'Anor', price: 25, discount: null },
    { name: 'Nok', price: 18, discount: 8 }
]
// showUser(<[]>products)
// -------------------------------------------------------------------------------
// 3
type location = {
    latitude: number,
    longitude: number
}
type Country = {
    name: string,
    population: number,
    location: location
}

const countries: Country[] = [
    { name: 'Uzbkeiston', population: 38000000, location: { latitude: 41.311081, longitude: 69.240562 } },
    { name: 'Qozog\'iston', population: 19500000, location: { latitude: 51.169392, longitude: 71.449074 } },
    { name: 'Qirg\'iziston', population: 6700000, location: { latitude: 42.874621, longitude: 74.569763 } },
    { name: 'Tojikiston', population: 9500000, location: { latitude: 38.559772, longitude: 68.787038 } },
    { name: 'Turkmaniston', population: 6200000, location: { latitude: 37.960077, longitude: 58.326063 } }
]
// showUser(<[]>countries)
// -------------------------------------------------------------------------------
// 4
const calculate = (first: number, second: number, value: string): void => {
    if (value == '+') {
        console.log(`${first}+${second}=${first + second}`);
    } else if (value == '-') {
        console.log(`${first}-${second}=${first - second}`);
    } else if (value == '*') {
        console.log(`${first}*${second}=${first * second}`);
    } else if (value == '/') {
        if (second != 0) console.log(`${first}/${second}=${first / second}`);
        else console.log('2 chi son 0 bo\'la olmaydi')
    }
}
// calculate(4, 0, '/')
// -------------------------------------------------------------------------------
// 5

class Animal {
    public name: string
    protected age: number
    private type
    constructor(name: string, age: number, type: string) {
        this.name = name,
            this.age = age,
            this.type = type
    }

    public get getInfo(): string {
        return `name: ${this.name}\nage: ${this.age}\ntype: ${this.type}`
    }
}

class Dogs extends Animal {
    constructor(name: string, age: number, type: string) {
        super(name, age, type)
    }
}

class Cat extends Animal {
    constructor(name: string, age: number) {
        super(name, age, 'Mushuk')
    }
}

const dog = new Dogs("Sharik", 2, "kuchuk")
const cat = new Cat('Momiq', 3)

// console.log(dog.getInfo);
// console.log(cat.getInfo);
// -------------------------------------------------------------------------------
// 6
class Bank {
    readonly accountNumber: number
    private _balance: number
    static bankName: string
    constructor(number: number, balance: number, name: string) {
        this.accountNumber = number,
            this._balance = balance,
            Bank.bankName = name
    }

    set setBalance(balance: number) {
        this._balance = balance
    }
    set setBankName(name: string) {
        Bank.bankName = name
    }

    get getInfo(): string {
        return `card_number: ${this.accountNumber}\nbalance: ${this._balance}\nbank_name: ${Bank.bankName}`
    }
}

const bank = new Bank(11112222, 100000000, 'Anor Bank')
// console.log(bank.getInfo);
bank.setBalance = 20000000
bank.setBankName = 'TBC Bank'
// console.log((bank.getInfo));
// -------------------------------------------------------------------------------
// 7
enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

interface User2 {
    id: number,
    username: string,
    email: string,
    status: Status
}

const user2: User2[] = [
    { id: 1, username: 'Adxam', email: 'adxam@gmail.com', status: Status.ACTIVE },
    { id: 2, username: 'Malika', email: 'malika@mail.com', status: Status.INACTIVE },
    { id: 3, username: 'Javlon', email: 'javlon@mail.com', status: Status.BLOCKED },
    { id: 4, username: 'Ravshan', email: 'ravshan@mail.com', status: Status.ACTIVE },
    { id: 5, username: 'Gulbahor', email: 'gulbahor@mail.com', status: Status.INACTIVE }
]
// showUser(<[]>user2)
// -------------------------------------------------------------------------------
// 8
const wrapInArray=<T>(item:T):T[]=>{
    let arr:T[]=[item]
    return arr
}
// console.log((wrapInArray(1)));
// console.log((wrapInArray('Salom')));
// console.log((wrapInArray(false)));
