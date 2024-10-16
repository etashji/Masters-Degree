import * as lab1 from './lab1.mjs';

//questionOne
console.log(lab1.questionOne([-1]));
console.log(lab1.questionOne([0]));
console.log(lab1.questionOne([1]));
console.log(lab1.questionOne([2]));
console.log(lab1.questionOne([11]));

//questionTwo
console.log(lab1.questionTwo([5, 3, 10]));
console.log(lab1.questionTwo([2]));
console.log(lab1.questionTwo([5, 10, 9]));
console.log(lab1.questionTwo([2, 7, 9, 1013]));
console.log(lab1.questionTwo([]));

//questionThree
console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog."));
console.log(lab1.questionThree("How now brown cow!!!"));
console.log(lab1.questionThree("One day, the kids from the neighborhood carried my mother's groceries all the way home." 
+ "You know why? It was out of respect."));
console.log(lab1.questionThree("CS 546 is going to be fun & I'm looking forward to working with you all this semester!!"));
console.log(lab1.questionThree(""));

//questionFour
console.log(lab1.questionFour([1,1,1,1,1,1]));
console.log(lab1.questionFour([1, '1', 1, '1', 2]));
console.log(lab1.questionFour([3, 'a', 'b', 3, '1']));
console.log(lab1.questionFour([]));
console.log(lab1.questionFour());

//studentInfo
console.log(lab1.studentInfo);