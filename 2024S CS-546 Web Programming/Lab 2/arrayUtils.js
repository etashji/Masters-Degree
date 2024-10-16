let arrayPartition = (arrayToPartition, partitionFunc) => {
  try {
    if (Array.isArray(arrayToPartition) == false) {
      throw new Error("The array to be partitioned is not an array or does not exist.");
    }
    else if (arrayToPartition.length == 0) {
      throw new Error("The array is empty.");
    }
    else if (arrayToPartition.length < 2) {
      throw new Error("The array must have at least 2 elements to be partitioned.")
    }
    else if (!(partitionFunc instanceof Function)) {
      throw new Error("The given partitionFunc is not a function.");
    }
    else {
      var array1 = [];
      var array2 = [];
      for (let i = 0; i < arrayToPartition.length; ++i) {
        if (typeof arrayToPartition[i] === 'string') {
          arrayToPartition[i].trim();
        }
        if (partitionFunc(arrayToPartition[i]) == true) {
          array1.push(arrayToPartition[i]);
        }
        else {
          array2.push(arrayToPartition[i]);
        }
      }
    }
    var result = [];
    result.push(array1);
    result.push(array2);
    return result;
  } catch(e) {
    return e;
  }
};

let arrayShift = (arr, n) => {
  try {
    if (Array.isArray(arr) == false) {
      throw new Error("The array to be shifted is not an array or does not exist.");
    }
    else if (arr.length < 2) {
      throw new Error("The array must have at least 2 elements to be shifted.");
    }
    else if (Number.isInteger(n) == false) {
      throw new Error("The number to shift either does not exist, is not a number, or is a decimal.");
    }
    else {
      var result = [];
      if (n == 0) {
        return arr;
      }
      else if (n > 0) {
        let index;
        if (n >= arr.length) {
          let counter = n;
          while (counter >= arr.length) {
            counter = counter - arr.length;
          }
          index = arr.length - counter;
        }
        else {
          index = arr.length - n;
        }
        while (result.length < arr.length) {
          result.push(arr[index]);
          if (index == arr.length - 1) {
            index = 0;
          }
          else {
            ++index;
          }
        }
        return result;
      }
      else {
        let index;
        if (n <= arr.length * -1) {
          let counter = n * -1;
          while (counter >= arr.length) {
            counter = counter - arr.length;
          }
          index = counter;
        }
        else {
          index = n * -1;
        }
        while (result.length < arr.length) {
          result.push(arr[index]);
          if (index == arr.length - 1) {
            index = 0;
          }
          else {
            ++index;
          }
        }
        return result;
      }
    }
  } catch(e) {
    return e;
  }
};

let matrixOne = (matrix) => {
  try {
     if (Array.isArray(matrix) == false) {
      throw new Error("The matrix either does not exist or is not the proper type (array).");
     }
     for (let i = 0; i < matrix.length; ++i) {
      if (Array.isArray(matrix[i]) == false) {
        throw new Error("An element within the matrix is not an array.");
      }
     }
     for (let i = 0; i < matrix.length; ++i) {
      if (matrix[i].length == 0) {
        throw new Error("An array within the matrix is empty.");
      }
     }
     for (let i = 0; i < matrix.length; ++i) {
      for (let j = 0; j < matrix[i].length; ++j) {
        if (!(typeof matrix[i][j] === 'number')) {
          throw new Error("An element of an array within the matrix is not a number.");
        }
      }
     }
     for (let i = 1; i < matrix.length; ++i) {
      if (matrix[i].length != matrix[0].length) {
        throw new Error("A sub-array within the matrix has a missing element.");
      }
     }
     var result = [];
     for (let i = 0; i < matrix.length; ++i) {
      result.push([]);
     }
     for (let i = 0; i < matrix.length; ++i) {
      for (let j = 0; j < matrix[i].length; ++j) {
        result[i].push(matrix[i][j]);
      }
     }
     for (let i = 0; i < matrix.length; ++i) {
      for (let j = 0; j < matrix[i].length; ++j) {
        if (matrix[i][j] == 0) {
          for (let k = 0; k < matrix[i].length; ++k) {
            result[i][k] = 1;
          }
          for (let k = 0; k < matrix.length; ++k) {
            result[k][j] = 1;
          }
        }
      }
     }
     return result;
  } catch(e) {
    return e;
  }
};

export { arrayPartition, arrayShift, matrixOne };