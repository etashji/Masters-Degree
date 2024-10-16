 let swapChars = (string1, string2) => {
  try {
    if (string1 == undefined || string2 == undefined) {
      throw new Error("One or both strings do not exist.");
    }
    else if (!(typeof string1 === 'string') || !(typeof string2 === 'string')) {
      throw new Error("One or both strings are not a string.");
    }
    else {
      string1 = string1.trim();
      string2 = string2.trim();
      if (string1.length < 4 || string2.length < 4) {
        throw new Error("One or both strings have less than 4 characters.");
      }
      else {
        var newString1 = "";
        var newString2 = "";
        for (let i = 0; i < 4; ++i) {
          newString1 += string2[i];
          newString2 += string1[i];
        }
        if (string1.length > 4) {
          for (let i = 4; i < string1.length; ++i) {
            newString1 += string1[i];
          }
        }
        if (string2.length > 4) {
          for (let i = 4; i < string2.length; ++i) {
            newString2 += string2[i];
          }
        }
        var combinedString = newString1 + " " + newString2;
        return combinedString;
      }
    }
  } catch (e) {
    return e;
  }
};

let longestCommonSubstring = (str1, str2) => {
  try {
    if (str1 == undefined || str2 == undefined) {
      throw new Error("One or both strings do not exist.");
    }
    else if(!(typeof str1 === 'string') || !(typeof str2 === 'string')) {
      throw new Error("One or both strings are not actually strings.")
    }
    else {
      str1 = str1.trim();
      str2 = str2.trim();
      if (str1.length == 0 || str2.length == 0) {
        throw new Error("One or more strings is either completely empty or contains only spaces.");
      }
      else if (str1.length < 5 || str2.length < 5) {
        throw new Error("One or both strings have less than 5 characters.");
      }
      else {
        var test = "";
        var result = "";
        for (let i = 0; i < str1.length; ++i) {
          for (let j = 0; j < str2.length; ++j) {
            if (str1[i] == str2[j]) {
              let l = j;
              for (let k = i; k < str1.length; ++k) {
                if (str1[k] != str2[l]) {
                  break;
                }
                else {
                  test += str1[k];
                }
                if (k == str1.length - 1 || l == str2.length - 1) {
                  break;
                }
                ++l;
              }
              if (test.length > result.length) {
                result = "";
                result += test;
              }
              test = "";
            }
          }
        }
      }
    }
    return result;
  } catch(e) {
    return e;
  }
};

let palindromeOrIsogram = (arrStrings) => {
  try {
    if (Array.isArray(arrStrings) == false) {
      throw new Error("The array either does not exist or is not an array.");
    }
    else {
      for (let i = 0; i < arrStrings.length; ++i) {
        if (!(typeof arrStrings[i] === 'string')) {
          throw new Error("An element in the array is not a string.");
        }
        else {
          arrStrings[i] = arrStrings[i].trim();
          if (arrStrings[i].length == 0) {
            throw new Error("A string in the array consists of just spaces.");
          }
        }
      }
      if (arrStrings.length < 2) {
        throw new Error("There are less than two strings in the array.");
      }
      else {
        let alphabet = "abcdefghijklmnopqrstuvwxyz";
        var result = new Object;
        for (let i = 0; i < arrStrings.length; ++i) {
          let palindrome = false;
          let isogram = true;
          let usedLetters = "";
          let lowerCase = arrStrings[i].toLowerCase();
          let copy = "";
          for (let j = 0; j < lowerCase.length; ++j) {
            if (alphabet.includes(lowerCase[j])) {
              copy += lowerCase[j];
              if (!(usedLetters.includes(lowerCase[j]))) {
                usedLetters += lowerCase[j];
              }
              else {
                isogram = false;
              }
            }
          }
          let reverse = "";
          for (let j = copy.length - 1; j >= 0; --j) {
            reverse += copy[j];
          }
          if (copy === reverse) {
            palindrome = true;
          }
          let key = "";
          key += arrStrings[i];
          if (palindrome && isogram) {
            result[key] = "Both";
          }
          else if(palindrome) {
            result[key] = "Palindrome";
          }
          else if(isogram) {
            result[key] = "Isogram";
          }
          else {
            result[key] = "Neither";
          }
        }
        return result;
      }
    }
  } catch(e) {
    return e;
  }
};

export { swapChars, longestCommonSubstring, palindromeOrIsogram };