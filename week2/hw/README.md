# Week 2 Homework: Functions and Basic JavaScript
In this week's homework, you will practice writing functions to calculate values,
manipulate objects, and iterate over arrays in JavaScript.

## What are functions?
A function is a self-contained block of code designed to perform a specific task. They help developers
segment their logic and avoid duplicating pieces of code.

Functions can return a value or nothing at all. We can call functions in other places in our code.
 
An example function for adding two numbers is as follows:
```
function add(num1, num2) {
    const sum = num1 + num2;
    return sum;
}
```
Here, if we were to write `const fourPlusFive = add(4, 5)`, the variable `fourPlusFive`
would end up containing the number `9`.

## Homework Requirements
There are four problems to complete for this homework, all of which are in the student.js file.
TO RECEIVE CREDIT for this homework, you must attain a total score of at least 10/15. You have unlimited attempts.
 
To test your code and run the autograder, execute `node autograder.js` in the terminal.
This will run the autograder for all four problems. Ensure you are in the same directory as
autograder.js and student.js when you execute this command.
 
To submit, take a screenshot of all test results and your total score as printed in the terminal. This homework will be DUE BY THE BEGINNING OF CLASS THIS MONDAY.

The form to submit your screenshot(s) can be found here: https://docs.google.com/forms/d/e/1FAIpQLSe1PIOpYXiDj5rTKL0AxLiXDTgai4hh0Ajkn_tKcT8WwpM4Ug/viewform?usp=dialog

## Additional Notes
Each function has various tags (e.g. @param, @returns) in its corresponding JSDoc comment (the commented explanations above each function). These tags help you understand what the function is expected to receive as parameters and return as results.

DO NOT:
- write code outside of the student.js file.
- change function headers (i.e. function names and parameters).
- change the `module.exports` statement at the bottom of student.js (this statement exports your functions so that autograder.js can access them).

Good luck, and don't hesitate to reach out for help!