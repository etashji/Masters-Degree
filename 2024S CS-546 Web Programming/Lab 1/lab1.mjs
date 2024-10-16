export const questionOne = (index) => {
  function fibbonacci (index) {
    if (index < 1) {
      result = 0;
    }
    else if (index == 1) {
      result = 1;
    }
    else {
      result = fibbonacci(index - 1) + fibbonacci(index - 2);
    }
    return result;
  };
  var result = fibbonacci(index);
  return result;
};

export const questionTwo = (arr) => {
  var primeObj = new Object;
  if (arr.length == 0) {
    primeObj = {};
  }
  else {
    for (let i = 0; i < arr.length; ++i) {
      let boolean = true;
      if (arr[i] < 2) {
        boolean = false;
      }
      else if (arr[i] == 2) {
        boolean = true;
      }
      else {
        for (let j = 2; j < arr[i]; ++j) {
          if (arr[i] % j == 0) {
            boolean = false;
          }
        }
      }
      let num = arr[i];
      primeObj[num] = boolean;
    }
  }
  
  return primeObj;
};

export const questionThree = (str) => {
  let consonants = 0;
  let vowels = 0;
  let numbers = 0;
  let spaces = 0;
  let punctuation = 0;
  let specialCharacters = 0;
  let consonantString = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
  let vowelString = "aeiouAEIOU";
  let numberString = "1234567890";
  let punctuationString = ".,'\"?![]{}()-:;";
  var result = [];
  for (var index = 0; index < str.length; ++index) {
    if (consonantString.includes(str[index])) {
      consonants++;
    }
    else if (vowelString.includes(str[index])) {
      vowels++;
    }
    else if (numberString.includes(str[index])) {
      numbers++;
    }
    else if (punctuationString.includes(str[index])) {
      punctuation++;
    }
    else if (str[index].match(" ")) {
      spaces++;
    }
    else {
      specialCharacters++;
    }
  }
  var result = {consonants:consonants, vowels:vowels, numbers:numbers, spaces:spaces, punctuation:punctuation, specialCharacters:specialCharacters};
 
  return result;
};

export const questionFour = (arr) => {
  if (arr == undefined) {
    arr = [];
  }
  if (arr.length == 0) {
    return arr;
  }
  var result = [];
  result.push(arr[0]);
  for (let i = 1; i < arr.length; ++i) {
    let duplicate = false;
    for (let j = 0; j < result.length; ++j) {
      if (arr[i] === result[j]) {
        duplicate = true;
      }
    }
    if (duplicate == false) {
      result.push(arr[i]);
    }
  }
  return result;
};


export const studentInfo = {
  firstName: 'Eric',
  lastName: 'Tashji',
  studentId: '20019353'
};
