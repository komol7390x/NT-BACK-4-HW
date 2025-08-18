// Array va Tuple
//  1
const minNumber = (arr: number[]): number => {
    const min = Math.min(...arr)
    return min
}
const result1 = minNumber([1, 2, 3, 4, 5, 6, 7, 0])
// console.log(result1);
// ---------------------------------------------------
// 2
const joinString = (arr: string[]): string => {
    return arr.join(',')
}
const result2 = joinString(['hello', 'world', 'bye'])
// console.log(result2);
// ---------------------------------------------------
// 3
const userInfo = (userName: string, loginTime: Date, isLoggedIn: boolean): void => {
    const time = new Date(loginTime.toUTCString().toString())
    if (isLoggedIn) {
        console.log(`${userName} tizimga kirgan\n${time}`);
    } else {
        console.log(`${userName} tizimga kirmagan!`);
    }
}
const nowTime = new Date()
// const result3 = userInfo('Bekzod', nowTime, false)
// ---------------------------------------------------
// 4
type Phone = {
    brand: string,
    model: string,
    price: number
}

const maxPrice = (phones: Phone[]):object => {
    return phones.reduce((max, item) => item.price < max.price ? item : max);
}
const phones: Phone[] = [
    { brand: 'Samsung', model: 'a15', price: 200 },
    { brand: 'Apple', model: '15 pro max', price: 800 },
    { brand: 'Xiomi', model: 'note 10 pro', price: 500 }

]
const result4 = maxPrice(phones)
// console.log(result4);
// ---------------------------------------------------
// 5
type Students = {
    name: string,
    grade: number,
    isActive: boolean
}
const isActiveStudents = (arr: Students[]):object => {
    return arr.filter(item=>item.isActive)
}
const students: Students[] = [
    { name: 'Bekzod', grade: 5, isActive: true },
    { name: 'Malika', grade: 4, isActive: false },
    { name: 'Javohir', grade: 3, isActive: true },
    { name: 'Dilnoza', grade: 5, isActive: true },
    { name: 'Sardor', grade: 2, isActive: false }
]
const result5=isActiveStudents(students)
// console.log(result5);

