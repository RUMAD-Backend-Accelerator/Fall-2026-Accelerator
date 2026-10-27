// --- Imports and configuration ---

const express = require('express');
const app = express();
const PORT = 3000;

// Add middleware to parse JSON
app.use(express.json());

let messages = [
    { id: 1, text: "Hello" },
    { id: 2, text: "I love beans!" },
    { id: 3, text: "The instructors are dope." }
];

// --- GET requests ---

// Homepage GET endpoint
app.get('/', (req, res) => {
    return res.status(200).send('Hello, world!');
});

// Messages GET endpoint
// Example URL: http://localhost:3000/messages?search=beans
app.get('/messages', (req, res) => {
    let searchString = undefined;
    if (req.query.search) {
        searchString = req.query.search;
        for (const message of messages) {
            if (message.text.includes(searchString)) {
                return res.status(200).json(message);
            }
        }
        return res.status(404).json({ error: 'Not found.' });
    }

    return res.status(200).json(messages);
});

// Get a specific message's text based on ID
// Example URL: http://localhost:3000/messages/2
app.get('/messages/:id', (req, res) => {
    const id = req.params.id;

    for (const message of messages) {
        if (message.id == id) {
            return res.status(200).json({ text: message.text });
        }
    }

    return res.status(404).json({ error: 'Message not found.' });
});



/**
 * Post a message based off given text.
 * 
 * req.body = { "text": "..." }
 */
let count = 4;
app.post('/messages', (req, res) => {
    const text = req.body.text;
    const newMessage = { id: count, text };
    count++;
    messages.push(newMessage);
    return res.status(201).json({ success: "Message was created!", newMessage });
});

// Start the server and have it listen for requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


/*
Script to be run in browser for a POST Request:

fetch('http://localhost:3000/messages', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'Hello!' })
});
*/