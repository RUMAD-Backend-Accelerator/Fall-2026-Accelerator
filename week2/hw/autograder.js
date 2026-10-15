const {
    average,
    getStudents,
    groupByRole,
    cartTotal
} = require("./student");

const testProblem1 = () => {
    console.log(`--- PROBLEM 1 ---`);

    let pointsEarned = 0;

    const tests = [
        { input: [1, 5, 6], expected: 4 },
        { input: [7, -2], expected: 2.5 },
        { input: [], expected: 0 },
        { input: [3], expected: 3 }
    ];
    
    for (let i = 0; i < tests.length; i++) {
        const input = tests[i].input;
        const expected = tests[i].expected;

        let testResult = `TEST ${i + 1} (`;

        try {
            const output = average(input);
            if (output === expected) {
                pointsEarned++;
                testResult += "PASS)";
            } else {
                testResult += `FAIL): average(${JSON.stringify(input)}) returned ` +
                `${output}, but should have returned ${expected}.`;
            }
        } catch (error) {
            testResult += `ERROR): ${error.message}.`;
        }

        console.log(testResult);
    }

    let problemResult = `${pointsEarned}/${tests.length} tests passed`;
    problemResult += (pointsEarned === tests.length) ? "!" : ".";
    console.log(problemResult);

    return { earned: pointsEarned, worth: tests.length };
};

const testProblem2 = () => {
    console.log(`--- PROBLEM 2 ---`);

    let pointsEarned = 0;

    const tests = [
        {
            input: [
                { name: "Willis", "age": 20, role: "Student" },
                { name: "Ana", "age": 24, role: "TA" },
                { name: "Raj", age: 19, role: "Student" },
                { name: "Jamie", age: 34, role: "Professor" },
            ],
            expected: [
                { name: "Willis", "age": 20, role: "Student" },
                { name: "Raj", age: 19, role: "Student" }
            ]
        },
        {
            input: [
                { name: "Jamie", age: 34, role: "Professor" },
                { name: "Park", age: 22, role: "TA" }
            ],
            expected: []
        },
        {
            input: [],
            expected: []
        },
        {
            input: [
                { name: "Willis", "age": 20, role: "Student" },
                { name: "Raj", age: 19, role: "Student" }
            ],
            expected: [
                { name: "Willis", "age": 20, role: "Student" },
                { name: "Raj", age: 19, role: "Student" }
            ]
        }
    ];
    
    for (let i = 0; i < tests.length; i++) {
        const input = tests[i].input;
        const expected = tests[i].expected;

        let testResult = `TEST ${i + 1} (`;

        try {
            const output = getStudents(input);
            const matches = expected.every(e => 
                output.some(o =>
                    e.name === o.name &&
                    e.age === o.age &&
                    e.role === o.role
                )
            );

            if (matches && output.length === expected.length) {
                pointsEarned++;
                testResult += "PASS)";
            } else {
                testResult += `FAIL): getStudents(${JSON.stringify(input)}) returned\n` +
                `${JSON.stringify(output)}, but should have returned\n${JSON.stringify(expected)}.`;
            }
        } catch (error) {
            testResult += `ERROR): ${error.message}.`;
        }

        console.log(testResult);
    }

    let problemResult = `${pointsEarned}/${tests.length} tests passed`;
    problemResult += (pointsEarned === tests.length) ? "!" : ".";
    console.log(problemResult);

    return { earned: pointsEarned, worth: tests.length };
};

const testProblem3 = () => {
    console.log(`--- PROBLEM 3 ---`);

    let pointsEarned = 0;

    const tests = [
        {
            input: [
                { name: "Willis", "age": 20, role: "Student" },
                { name: "Ana", "age": 24, role: "TA" },
                { name: "Raj", age: 19, role: "Student" },
                { name: "Jamie", age: 34, role: "Professor" },
            ],
            expected: {
                Student: [
                    { name: "Willis", "age": 20, role: "Student" },
                    { name: "Raj", age: 19, role: "Student" },
                ],
                TA: [{ name: "Ana", "age": 24, role: "TA" }],
                Professor: [{ name: "Jamie", age: 34, role: "Professor" }]
            }
        },
        {
            input: [
                { name: "Willis", "age": 20, role: "Student" },
                { name: "Raj", age: 19, role: "Student" }
            ],
            expected: {
                Student: [
                    { name: "Willis", "age": 20, role: "Student" },
                    { name: "Raj", age: 19, role: "Student" },
                ]
            }
        },
        {
            input: [],
            expected: {}
        },
    ];
    
    for (let i = 0; i < tests.length; i++) {
        const input = tests[i].input;
        const expected = tests[i].expected;

        let testResult = `TEST ${i + 1} (`;

        try {
            const output = groupByRole(input);

            if (JSON.stringify(output) === JSON.stringify(expected)) {
                pointsEarned++;
                testResult += "PASS)";
            } else {
                testResult += `FAIL): groupByRole(${JSON.stringify(input)}) returned\n` +
                `${JSON.stringify(output)}, but should have returned\n${JSON.stringify(expected)}.`;
            }
        } catch (error) {
            testResult += `ERROR): ${error.message}.`;
        }

        console.log(testResult);
    }

    let problemResult = `${pointsEarned}/${tests.length} tests passed`;
    problemResult += (pointsEarned === tests.length) ? "!" : ".";
    console.log(problemResult);

    return { earned: pointsEarned, worth: tests.length };
}

const testProblem4 = () => {
    console.log(`--- PROBLEM 4 ---`);

    let pointsEarned = 0;

    const tests = [
        {
            input: {
                items: [
                    { name: "Pen", price: 1.5, quantity: 4 },
                    { name: "Notebook", price: 3.25, quantity: 2 }
                ],
                discount: 10
            },
            expected: 11.25
        },
        {
            input: {
                items: [
                    { name: "Pen", price: 1.5, quantity: 4 },
                    { name: "Notebook", price: 3.25, quantity: 2 }
                ],
                discount: 0
            },
            expected: 12.5
        },
        {
            input: {
                items: [
                    { name: "Pen", price: 1.5, quantity: 4 },
                    { name: "Notebook", price: 3.25, quantity: 2 },
                    { name: "Laptop", price: 599, quantity: 2 },
                    { name: "Claude Subscription", price: 20, quantity: 1}
                ],
                discount: 22
            },
            expected: 959.79
        },
        {
            input: {
                items: [],
                discount: 7
            },
            expected: 0
        }
    ];
    
    for (let i = 0; i < tests.length; i++) {
        const inputItems = tests[i].input.items;
        const inputDisc = tests[i].input.discount;
        const expected = tests[i].expected;

        let testResult = `TEST ${i + 1} (`;

        try {
            const output = (inputDisc === 0) ? cartTotal(inputItems) : cartTotal(inputItems, inputDisc);

            if (output === expected) {
                pointsEarned++;
                testResult += "PASS)";
            } else {
                if (inputDisc === 0) {
                    testResult += `FAIL): cartTotal(${JSON.stringify(inputItems)}) returned ` +
                `${output}, but should have returned ${expected}.`;
                } else {
                    testResult += `FAIL): cartTotal(${JSON.stringify(inputItems)}, ${inputDisc}) returned ` +
                    `${output}, but should have returned ${expected}.`;
                }
            }
        } catch (error) {
            testResult += `ERROR): ${error.message}.`;
        }

        console.log(testResult);
    }

    let problemResult = `${pointsEarned}/${tests.length} tests passed`;
    problemResult += (pointsEarned === tests.length) ? "!" : ".";
    console.log(problemResult);

    return { earned: pointsEarned, worth: tests.length };
}

// --- Run tests and calculate the total score

let totalPointsEarned = 0;
let totalPointsWorth = 0;

const points1 = testProblem1();
totalPointsEarned += points1.earned;
totalPointsWorth += points1.worth;
console.log();

const points2 = testProblem2();
totalPointsEarned += points2.earned;
totalPointsWorth += points2.worth;
console.log();

const points3 = testProblem3();
totalPointsEarned += points3.earned;
totalPointsWorth += points3.worth;
console.log();

const points4 = testProblem4();
totalPointsEarned += points4.earned;
totalPointsWorth += points4.worth;
console.log();

const percentScore = Math.round((totalPointsEarned / totalPointsWorth * 100) * 100) / 100;
console.log(`Total score: ${totalPointsEarned}/${totalPointsWorth} (${percentScore}%)`);