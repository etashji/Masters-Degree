import * as helpers from "./helpers.js"

let objectStats = (arrObjects) => {
  try {
    if (Array.isArray(arrObjects) == false) {
      throw new Error("The array either does not exist or is not an array.");
    }
    else {
      for (let i = 0; i < arrObjects.length; ++i) {
        if (!(typeof arrObjects[i] === 'object') || Array.isArray(arrObjects[i]) == true) {
          throw new Error("An element in the array is not an object.");
        }
        else if (Object.keys(arrObjects[i]).length == 0) {
          throw new Error("An object in the array is empty.");
        }
        else {
          let values = Object.values(arrObjects[i]);
          for (let j = 0; j < values.length; ++j) {
            if (!(typeof values[j] === 'number')) {
              throw new Error("A value associated with a key in an object in the array is not a number.");
            }
            else {
              let string = values[j].toString();
              if (string.includes('.')) {
                let splitString = string.split('.')[1]
                if (splitString.length > 3) {
                  throw new Error("A number associated with a key in an object in the array has more than 3 decimal points.");
                }
              }
            }
          }   
        }
      }
    }
    var result = new Object;
    let nums = [];
    let sum = 0;
    for (let i = 0; i < arrObjects.length; ++i) {
      let values = Object.values(arrObjects[i]);
      for (let j = 0; j < values.length; ++j) {
        nums.push(values[j]);
        sum += values[j];
      }
    }
    nums.sort((x, y) => x - y);
    let minimum = nums[0];
    let maximum = nums[nums.length - 1];
    let median;
    if (nums.length % 2 == 0) {
      median = (nums[nums.length / 2] + nums[(nums.length / 2) - 1]) / 2;
    }
    else {
      median = nums[(nums.length - 1) / 2];
    }
    let count = nums.length;
    let mean = Math.round((sum / count) * 1000) / 1000;
    let range = maximum - minimum;
    let currNum = nums[0];
    let currCount = 0;
    let maxCount = 0;
    let mode = currNum;
    for (let i = 1; i < nums.length; ++i) {
      if (nums[i] == currNum) {
        ++currCount;
        if (currCount > maxCount) {
          maxCount = currCount;
          mode = nums[i]; 
        }
      }
      else {
        currCount = 0;
      }
      currNum = nums[i];
    }
    result["mean"] = mean;
    result["median"] = median;
    result["mode"] = mode;
    result["range"] = range;
    result["minimum"] = minimum;
    result["maximum"] = maximum;
    result["count"] = count;
    result["sum"] = sum;
    return result;
  } catch(e) {
    return e;
  }
};

let nestedObjectsDiff = (obj1, obj2) => {
  try {
    if (!(typeof obj1 === 'object') || !(typeof obj2 === 'object') || Array.isArray(obj1) == true || Array.isArray(obj2) == true) {
      throw new Error("Either one of the objects does not exist or is not an object.");
    }
    else if (Object.keys(obj1).length == 0 || Object.keys(obj2).length == 0) {
      throw new Error("One or both objects are empty.");
    }
    else {
      var result = new Object;
      result = helpers.sortObjects(obj1, obj2);
      return result;
    }
  } catch(e) {
    return e;
  }
};

let mergeAndSumValues = (...args) => {
  try {
      let objects = [];
      let result = {};
      objects.push(...args);
      if (objects.length == 0) {
        throw new Error("No arguments were passed to the function.")
      }
      for (let i = 0; i < objects.length; ++i) {
        if (!(typeof objects[i] === 'object') || Array.isArray(objects[i]) == true) {
          throw new Error("Either one of the objects does not exist or is not an object.");
        }
        else if (Object.keys(objects[i]).length == 0) {
          throw new Error("One or more of the objects is empty.");
        }
        let keys = Object.keys(objects[i]);
        let values = Object.values(objects[i]);
        for (let j = 0; j < values.length; ++j) {
          if (!(typeof values[j] === 'number')) {
            let num = Number(values[j]);
            if (num.toString() == 'NaN') {
              throw new Error("One of the values in one of the objects is not a number or a string representing a number.");
            }
            else {
              objects[i][keys[j]] = num;
            }
          }
          if (Object.keys(result).includes(keys[j])) {
            result[keys[j]] = result[keys[j]] + objects[i][keys[j]];
          }
          else  {
            result[keys[j]] = objects[i][keys[j]];
          }
        }
      }
      return result;
    } catch(e) {
      return e;
    }
};

export { objectStats, nestedObjectsDiff, mergeAndSumValues };