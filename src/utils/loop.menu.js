export const loopMenu = async (model) => {

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