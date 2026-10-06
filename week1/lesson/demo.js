/* --- Variables and Types --- */

let testString = "Hello world";
const testConst = 67;
let str2 = "67";
console.log(testString);

/* --- Comparisons --- */

let truthValue = testString === testConst;
let truthValue2 = str2 == testConst;

console.log(truthValue);
console.log(truthValue2);

/* --- Lists and Loops --- */

let arr = [1, 2, 3, 4, 5];
arr.forEach((liam) => {
    console.log(liam);
});

for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
}

arr.push(6);

arr.forEach((liam) => {
    console.log(liam);
});

/* --- Dictionaries --- */

let dictOfCosts = {
    "Small Pizza": 8,
    "Medium Pizza": 10,
    "Large Pizza": 12
};

console.log(dictOfCosts["Medium Pizza"]);

let dict2 = {
    2: "two"
};
console.log(dict2[2]);