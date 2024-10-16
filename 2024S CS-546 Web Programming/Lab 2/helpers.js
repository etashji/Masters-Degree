function sortObjects(obj1, obj2) {
    let obj1Keys = Object.keys(obj1).sort();
    let obj2Keys = Object.keys(obj2).sort();
    let obj1Values = Object.values(obj1).sort();
    let obj2Values = Object.values(obj2).sort();
    let result = new Object;
    if (obj1Keys.toString() == obj2Keys.toString() && obj1Values.toString() == obj2Values.toString()) {
        result = {};
    }
    else {
        for (let i = 0; i < obj1Keys.length; ++i) {
            if (obj2Keys.includes(obj1Keys[i])) {
                if (typeof obj1[obj1Keys[i]] === 'object' && Array.isArray(obj1[obj1Keys[i]]) == false) {
                    result[obj1Keys[i]] = sortObjects(obj1[obj1Keys[i]], obj2[obj1Keys[i]])
                }
                else if (obj1[obj1Keys[i]] != obj2[obj1Keys[i]]) {
                    result[obj1Keys[i]] = obj2[obj1Keys[i]];
                }
            }
            else  {
                result[obj1Keys[i]] = undefined;
            }
        }
        for (let i = 0; i < obj2Keys.length; ++i) {
            if (!(obj1Keys.includes(obj2Keys[i]))) {
                result[obj2Keys[i]] = obj2[obj2Keys[i]];
            }
        }
    }
    return result;
}

export { sortObjects }