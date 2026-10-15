/**
 * PROBLEM 1:
 * 
 * Write a function to calculate the average value of an array of numbers.
 * 
 * You are given the `nums` array, which contains the numbers to be averaged.
 * 
 * Return the average of all numbers in this array. If the array is empty, return 0.
 * 
 * @param {number[]} nums - the array of numbers whose average should be calculated.
 * @returns {number} the average of all numbers in nums, or 0 if nums is empty.
 */
function average(nums) {
    // TODO: your code here
}

/**
 * PROBLEM 2:
 * 
 * Write a function that, from an array of people, gets those who are students.
 * The `people` parameter stores an array of objects, each of which represents a person.
 * 
 * Each person object has a name, age, and role. An example person object is as follows:
 * {
 *      "name": "Willis",
 *      "age": 20,
 *      "role": "Student"
 * }
 * 
 * Below is an example for the people array:
 * [
 *      { "name": "Willis", "age": 20, "role": "Student" },
 *      { "name": "Ana", "age": 24, "role": "TA" },
 *      { "name": "Raj", "age": 19, "role": "Student" }
 * ]
 * 
 * A person is considered a student if the value of their role property equals "Student".
 * 
 * Say we have a variable 'person' that represents the person object above.
 * Here are two ways to retrieve some of this object's values:
 * - person["name"]
 * - person.name
 * These will both return the value "Willis".
 * 
 * @param {Object[]} people - the array of people to get students from.
 * @returns {Object[]} an array of all person objects with the role "Student".
 */
const getStudents = (people) => {
    // TODO: your code here
};

/**
 * PROBLEM 3:
 * 
 * We are gathering by specific traits like role. For example, by height, we gather all
 * of the people that are that specific height.
 * 
 * We want the keys to be roles and the values to be arrays of people, and the original
 * order is kept.
 * 
 * Keep in mind that roles are case-sensitive, so student differs from Student.
 * 
 * Always check whether a role exists before accessing it. To access an element, use
 * groups[role].
 * 
 * An example person object is as follows:
 * {
 *      "name": "Willis",
 *      "age": 20,
 *      "role": "Student"
 * }
 * 
 * Example: for the array
 * [
 *      { "name": "Willis", "age": 20, "role": "Student" },
 *      { "name": "Ana", "age": 24, "role": "TA" },
 *      { "name": "Raj", "age": 19, "role": "Student" }
 * ]
 * the function returns
 * {
 *      "Student": [ the Willis object, the Raj object ],
 *      "TA": [ the Ana object ]
 * }
 * 
 * @param {Object[]} people - the array of people to group.
 * @returns {Object} an object mapping each role to an array of the people with that role.
 */
function groupByRole(people) {
    // TODO: your code here
}



/**
 * PROBLEM 4:
 * 
 * We need to calculate the total of the shopping cart after accounting for the specific
 * discount rate for the cart.
 * 
 * We multiply the per unit price of an item by the quantity that you buy, and then we
 * add up all the items. Next, we apply the discount and round to 2 decimal places after
 * the full calculation.
 * 
 * A discount percent of 10 means it is 90 percent of the original price.
 * 
 * The default value of the discount is 0. When no discount percent is passed or when it
 * is zero, don't multiply by the discount at all, and still round at the end. Use
 * Math.round(x * 100) / 100, where x is the total price after the discount is applied.
 * 
 * An empty cart returns 0.
 * 
 * An example item object is as follows:
 * {
 *      "name": "Pen",
 *      "price": 1.5,
 *      "quantity": 4
 * }
 * 
 * Example: for the array
 * [
 *      { "name": "Pen", "price": 1.5, "quantity": 4 },
 *      { "name": "Notebook", "price": 3.25, "quantity": 2 }
 * ]
 * cartTotal(items, 10) returns 11.25, and cartTotal(items) returns 12.5.
 * 
 * @param {Object[]} items - the items in the cart.
 * @param {number} [discountPercent=0] - the percent to take off the cart total.
 * @returns {number} the cart total after the discount, rounded to 2 decimal places.
 */
function cartTotal(items, discountPercent = 0) {
    // TODO: your code here
}

module.exports = {
    average,
    getStudents,
    groupByRole,
    cartTotal
};