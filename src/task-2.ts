// Union Types bilan ishlash

import { it } from "node:test";

// 1
const findType=(item:string|number):string|number=>{
    const arr=item.toString().split('')
    for(let i=0;i<arr.length;i++){        
        if(isNaN(Number(arr[i]))){
            return item
        }
    }
    return Number(item)
}

const result1=findType('12345e');
// console.log(result1);
// ----------------------------------------------------------
// 2
const findType2=(item:string|boolean):number|boolean=>{
    if(typeof item=='boolean'){
        return true
    }else{
        return item.length
    }
}
const result2=findType2('true')
// console.log(result2);
// ----------------------------------------------------------
// 3
const findAge=(age:number):string=>{
    if(age>=18){
        return 'Balog\'atga yetgan'
    }else{
        return 'Balog\'atga yetmagan'
    }
}

const result3=findAge(17)
// console.log(result3);
// ----------------------------------------------------------
// 4
const ghost=(item:string|undefined|null):void=>{
    if((typeof item=='string') && item){
        console.log('Xush kelibsiz, '+item);
        return
    }else{
        console.log('Xush kelibsiz, Mehmon');
        return
    }
}
// ghost('')
// ----------------------------------------------------------
// 5
const sayHi=():void=>{
    console.log('Xush kelibsiz!');
}
// sayHi()
// ----------------------------------------------------------
// 6
const errorAsk=():never=>{
    throw new Error('Error bo\'ldi')
}
errorAsk()