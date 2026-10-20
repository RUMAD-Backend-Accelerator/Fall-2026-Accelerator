// --- Imports and configuration ---

const express = require('express');
const app = express();
const PORT = 3000;

// Add middleware to parse JSON
app.use(express.json());

// --- GET requests ---

// Homepage GET endpoint
app.get('/', (req, res) => {
    return res.send('Hello, world!');
});

// Messages GET endpoint
let messages = ["Hello", "I love beans!", "The instructors are dope."];
app.get('/messages', (req, res) => {
    return res.json(messages);
});

// Start the server and have it listen for requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});