const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const tasks = [
    {
        id: 1,
        title: 'Do Backend Accelerator HW',
        isCompleted: false,
    },
    {
        id: 2,
        title: 'Prepare for Data Structures Midterm',
        isCompleted: false
    },
    {
        id: 3,
        title: 'Update LinkedIn Profile',
        isCompleted: true
    }
];
let nextId = tasks.length + 1;


/**
 * EXAMPLE ENDPOINT: GET /
 * 
 * Respond with a JSON object with the message 'Welcome to the TO-DO list!'.
 *
 * Example URL: http://localhost:3000
 * Example Response: status code 200 and { "message": "Welcome to the TO-DO list!" }
 */
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to the TO-DO list!' });
});

/**
 * PROBLEM 1: GET /tasks/count
 * 
 * Write a full GET endpoint that responds with a JSON object containing the number of tasks currently stored.
 * 
 * This route MUST be above GET /tasks/:id. Express checks routes from top to bottom,
 * so otherwise "count" would be treated as an id.
 *
 * Example URL: http://localhost:3000/tasks/count
 * Example Response: status code 200 and { "count": 3 }
 */
// TODO: your code here

/**
 * PROBLEM 2: GET /tasks/:id
 * 
 * Write a GET endpoint that responds with a JSON task object with the id specified
 * in the `id` path parameter. return a JSON object with an error message if not found.
 * 
 * Note that path parameters are strings. Keep this in mind when comparing the `id` path parameter
 * to values that are of type number.
 *
 * Example URL 1: http://localhost:3000/tasks/2
 * Example response 1: status code 200 and { "id": 2, "title": "Prepare for Data Structures Midterm", "isCompleted": false }
 * Example URL 2: http://localhost:3000/tasks/0
 * Example response 2: status code 404 and { "error": "Task with ID of 0 was not found" }
 */
app.get('/tasks/:id', (req, res) => {
    // TODO: your code here
});

/**
 * PROBLEM 3: GET /tasks
 * 
 * Write a GET endpoint that responds with a JSON list of all tasks found based on the optional query parameters.
 * 
 * The combinations of query parameters include `completed` (e.g. /tasks?completed=false), `search`,
 * (e.g. /tasks?search=linkedin), both parameters (e.g. /tasks?completed=false&search=prep), or neither
 * (e.g. /tasks). These query parameters are to act as filters for which tasks are sent back to the client.
 * 
 * If there are no query parameters, respond with all tasks currently stored.
 * 
 * If the `completed` query parameter is specified, respond with only the tasks that match the corresponding
 * value (either 'true' or 'false'). Note that that query parameters are strings. Keep this in mind when
 * comparing the value of `completed` to values that are of type boolean.
 * 
 * If the `search` query parameter is specified, respond with only the tasks havings titles that contain the
 * corresponding keyword in `search`. The comparisons should be case-insensitive. You can use the .toLowerCase()
 * string method to achieve this.
 * 
 * If both query parameters are specified, respond with only the tasks that satisfy both.
 *
 * Example URL 1: http://localhost:3000/tasks
 * Example response 1: status code 200 and
 * [
 *     { "id": 1, "title": "Do Backend Accelerator HW", "isCompleted": false },
 *     { "id": 2, "title": "Prepare for Data Structures Midterm", "isCompleted": false },
 *     { "id": 3, "title": "Update LinkedIn Profile", "isCompleted": true }
 * ]
 * 
 * Example URL 2: http://localhost:3000/tasks?completed=false
 * Example response 2: status code 200 and
 * [
 *     { "id": 1, "title": "Do Backend Accelerator HW", "isCompleted": false },
 *     { "id": 2, "title": "Prepare for Data Structures Midterm", "isCompleted": false }
 * ]
 * 
 * Example URL 3: http://localhost:3000/tasks?search=linkedin
 * Example response 3: status code 200 and [{ "id": 3, "title": "Update LinkedIn Profile", "isCompleted": true }]
 * 
 * Example URL 4: http://localhost:3000/tasks?completed=false&search=prep
 * Example response 4: status code 200 and [{ "id": 2, "title": "Prepare for Data Structures Midterm", "isCompleted": false }]
 */
app.get('/tasks', (req, res) => {
    // TODO: your code here
});

/**
 * PROBLEM 4: POST /tasks
 * 
 * Write a full POST endpoint that adds a new task to the current task list and responds with a
 * JSON object of the new task or a JSON object of an error if there is no specified title
 * in the request body.
 * 
 * The request body will contain a `title` field that contains a string. You will
 * create a new task object that contains this title, a unique ID, and a default
 * `isCompleted` value of false.
 * 
 * Unique IDs should always increment by 1 for each new task. You can use the provided `nextId`
 * variable to assign and keep track of the next available unique ID.
 * 
 * When responding with an error, you can set the error message to be any string.
 * 
 * Example URL: http://localhost:3000/tasks
 * Example req.body: { "title": "Buy milk" }
 * Example success response: status code 201 and the new task { "id": 4 , "title": "Buy milk", "isCompleted": false }
 * Example missing or blank title response: status code 400 and { "error": "..." }
 */
// TODO: your code here

/**
 * PROBLEM 5: POST /tasks/bulk
 * 
 * Write a POST endpoint that adds new tasks generated from a given list of titles to the current stored list.
 * It should respond with a JSON list of the newly added tasks (no previously-existing tasks)
 * or a JSON object of an error if `titles` is missing, not an array, empty, or contains a blank title.
 * 
 * When responding with an error, you can set the error message to be any string.
 * 
 * Example URL: http://localhost:3000/tasks/bulk
 * Example request body: { "titles": ["A", "B", "C"] }
 * Example Success: 201 and a list of the new task objects, in the same order as the input list.
 * If titles is missing, not an array, empty, or ANY title is blank: 400 and
 * { "error": "..." }, and NO tasks are added.
 */
app.post('/tasks/bulk', (req, res) => {
    // TODO: your code here
});

/**
 * PROBLEM 6: POST /tasks/:id/complete
 * 
 * Write a POST endpoint that marks the task specified by the `id` path parameter
 * as completed, sending it back as a JSON object. Respond with an JSON object of an
 * error if the task is not found.
 * 
 * When responding with an error, you can set the error message to be any string.
 * 
 * Note that you do not need information from req.body for this POST endpoint.
 * 
 * Example URL 1: http://localhost:3000/tasks/1/complete
 * Example response 1: status code 200 and { "id": 1, "title": "Do Backend Accelerator HW", "isCompleted": true }
 * 
 * Example error response: status code 404 and { "error": "..." }
 */
app.post('/tasks/:id/complete', (req, res) => {
    // TODO: your code here
});

// ---------------------------------------------------------------------------
// DO NOT change anything below this line. The autograder needs it.
// ---------------------------------------------------------------------------

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = { app, tasks };