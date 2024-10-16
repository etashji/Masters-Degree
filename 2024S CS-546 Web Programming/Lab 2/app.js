import * as arrayUtils from "./arrayUtils.js";
import * as stringUtils from "./stringUtils.js";
import * as objectUtils from "./objectUtils.js";

//ArrayUtils arrayPartition Function

//Test Case 1: Throws an Error.
console.log("ArrayUtils arrayPartition function test case 1:");
const errorArray2 = []; 
const errorFunc2 = (num) => num % 2 === 0; 
const errorArrays2 = arrayUtils.arrayPartition(errorArray2, errorFunc2); 
console.log(errorArrays2);

//Test Case 2, Expected Result: [[2, 4], [1, 3, 5]]
console.log("\nArrayUtils arrayPartition function test case 2:");
const arrayToPartition1 = [1, 2, 3, 4, 5]; 
const partitionFunc1 = (num) => num % 2 === 0; 
const partitionedArrays1 = arrayUtils.arrayPartition(arrayToPartition1, partitionFunc1); 
console.log(partitionedArrays1);

//ArrayUtils arrayShift function

//Test Case 1: Throws error
console.log("\nArrayUtils arrayShift function test case 1:")
console.log(arrayUtils.arrayShift([7, 11, 15], 3.5));

//Test Case 2, Expected result: [5, 6, 7, 3, 4]
console.log("\nArrayUtils arrayShift function test case 2:")
console.log(arrayUtils.arrayShift([3, 4, 5, 6, 7], 3));

//ArrayUtils matrixOne function

//Test Case 1: Throws an Error
console.log("\nArrayUtils matrixOne function test case 1:");
console.log(arrayUtils.matrixOne([[0,1,2,0],[3, 5, 4]]));

//Test Case 2, Expected result: [[2, 1, 2], [1, 1, 1], [2, 1, 2]]
console.log("\nArrayUtils matrixOne function test case 2:");
console.log(arrayUtils.matrixOne([[2,2,2],[2,0,2],[2,2,2]]));

//stringUtils swapChars function

//Test Case 1: Throws an Error
console.log("\nstringUtils swapChars function test case 1:")
console.log(stringUtils.swapChars("Patrick", ""));

// //Test Case 2, Expected result: Hillick Patr
console.log("\nstringUtils swapChars function test case 2:");
console.log(stringUtils.swapChars("Patrick", "Hill"));

//stringUtils longestCommonSubstring function

//Test Case 1: Throws an Error
console.log("\nstringUtils longestCommonSubstring function test case 1:");
console.log(stringUtils.longestCommonSubstring("First string.", " "));

//Test Case 2, Expected result: abcd
console.log("\nstringUtils longestCommonSubstring function test case 2:");
console.log(stringUtils.longestCommonSubstring("abcdxyz", "xyzabcd"));

//stringUtils palindromeOrIsogram

//Test Case 1: Throws an Error
console.log("\nstringUtils palindromeOrIsogram function test case 1:");
console.log(stringUtils.palindromeOrIsogram(["First string."]));

//Test Case 2, Expected result: { Madam: Palindrome, Lumberjack: Isogram, He did, eh?: Palindrome, Background: Isogram, Taco cat? Taco cat.: Palindrome, Invalid String: Neither}
console.log("\nstringUtils palindromeOrIsogram function test case 2:")
console.log(stringUtils.palindromeOrIsogram(["Madam", "Lumberjack", "He did, eh?", "Background", "Taco cat? Taco cat.", "Invalid String"]));

//objectUtils objectStats

//Test Case 1: Throws an Error
console.log("\nobjectUtils objectStats function test case 1:");
console.log(objectUtils.objectStats([{"key":"value"}]));

//Test Case 2, Expected Result: { mean: 8.346, median: 10, mode: 15, range: 17, minimum: -2, maximum: 15, count: 13, sum: 108.5 }
console.log("\nobjectUtils objectStats function test case 2:");
console.log(objectUtils.objectStats([{"a": 12, "b": 8, "c": 15, "d": 12, "e": 10, "f": 15}, {"x": 5, "y": 10, "z": 15}, {"p": -2, "q": 0, "r": 5, "s": 3.5}]));

//objectUtils nestedObjectsDiff

//Test Case 1: Throws an Error
console.log("\nobjectUtils nestedObjectsDiff function test case 1:");
console.log(objectUtils.nestedObjectsDiff({},{}));

//Test Case 2, Expected result: { key2: { arrayKey: [1, 2, 4], nestedKey: 'differentValue' }, key3: 'newKey }
console.log("\nobjectUtis nestedObjectsDiff function test case 2:");
console.log(objectUtils.nestedObjectsDiff({ "key1": "value1", "key2": { "nestedKey": "nestedValues", "arrayKey": [1, 2, 3]}}, 
{ "key1": "value1", "key2": { "nestedKey": "differentValue", "arrayKey" : [1, 2, 4]}, "key3": "newKey"}));

//objectUtils mergeAndSumValues

//Test Case 1: Throws an Error
console.log("\nobjectUtils mergeAndSumValues function test case 1:")
console.log(objectUtils.mergeAndSumValues({ "a": 1, "b": "2", "c": 3 }, { "b": 3, "c": 4, "d": 5 }, {"a": 2, "c": "hello", "e": 6 }));

//Test Case 2, Expected result: { a: 8, b: 9, c: 16, d: 4, e: 6 }
console.log("\nobjectUtils mergeAndSumvalues function test case 2:");
console.log(objectUtils.mergeAndSumValues({ "a": 3, "b": 7, "c": "5"}, {"b": 2, "c": "8", "d": "4"}, {"a": 5, "c": 3, "e": 6}))

