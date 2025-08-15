
export const arrInArr = async (model) => {
    const data = (await model.findAll())[0].dataValues
    let arr = []
    let arr2 = []
    let c = 0

    for (let [key, value] of Object.entries(data)) {
        if (key === 'id') continue;
        arr2.push(value);
        c++;
        if (c === 2) {
            arr.push(arr2);
            arr2 = [];
            c = 0;
        }
    }
    return arr
}

export const arrayMenu = async (model) => {
    const data = (await model.findAll())[0].dataValues
    let arr = []
    for (let [key, value] of Object.entries(data)) {
        if (key == 'id') continue;
        arr.push(value)
    }
    return arr
}

export const menuObj = async (model) => {
    const data = (await model.findAll())
    const arr = []
    for (let i = 0; i < data.length; i++) {
        arr.push(data[i].dataValues)
    }
    return arr
}