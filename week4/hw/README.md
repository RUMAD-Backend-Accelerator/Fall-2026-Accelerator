# Week 4 Homework: GET and POST Endpoints
In this week's homework, you will practice building API endpoints with Express. You will write
routes that read data (GET) and routes that create or change data (POST) for a small TODO list server.

## Review
### Requests and Responses
A client can send a variety of requests to a backend server with the goal of obtaining or modifying information. The main
requests are GET (to retrieve information), POST (to create information), PUT/PATCH (to update information), and DELETE
(to remove information). A server must be able to handle the requests that a client sends to provide correct and predictable
functionality for an application. This usually includes sending a response back to the client with some type of information.

Requests are typically sent to a designated path denoted as a URL. This URL is a digital location where an API receives a request from a client
and sends back a response. This digital location is referred to as an endpoint.

Clients and servers can communicate requests and responses through the internet primarily using protocols like
HTTPS (Hypertext Transfer Protocol Secure). For the purposes of development on a local machine, we can use HTTP (HTTPS without the Secure).

### Express
Express is a framework built on Node.js to simplify backend development, specifically regarding request handling. It allows us to write API
endpoints for requests while eliminating much of the boilerplate code necessary when handling endpoints with solely Node.js.

Example syntax for GET endpoints in Express is as such:
```
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello, World!' }); // Send response object back to client with success code 200
});
```
The `.get()` method signals that you are writing a GET endpoint for your app. The first parameter to this method is the path, which defines
the URL endpoint where the request from the client is being received on the server. The second parameter is a callback function (or route handler)
which executes when a client hits the specified endpoint. It takes two arguments:
- `req`: the request object coming from the client that contains nested objects with additional data, such as path parameters (`req.params`),
query strings (`req.query`), and the request body (`req.body`)
- `res`: the response object to be sent back to the client, providing methods for sending JSON objects (`res.json()`), general responses dynamically
(`res.send()`), and status codes (`res.status()`, which should be chained right before sending the response with the previously-mentioned methods).

Example syntax for POST endpoints in Express is as such:
```
const names = ['Sanjay', 'Riyana']; // List of names stored on the server

app.post('/names', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "No name provided." }); // validate input, respond with error code 400 if invalid
  }

  names.push(req.body.name); // add input name to the stored list

  return res.status(201).json(names); // send response object back to client with success code 201
});
```
The `.post()` method signals that you are writing a POST endpoint for your app. The parameters to this method are the same as for GET.
In this example, we ensure to validate the information being sent in the request body before performing an operation with it. It is always
important to consider cases of malformed input to ensure that your API behaves predictably under all circumstances.

## Setup
1. Open a terminal in this folder (the one that contains `server.js` and `autograder.js`).
2. Run `npm install` once. This installs the packages the server and the autograder need.

## Homework Requirements
There are six problems to complete for this homework, all of which are in the `server.js` file.
Each problem has a comment above it that explains what the route should do, with examples.
The `GET /` route already in `server.js` is an example of what a finished route looks like.

TO RECEIVE CREDIT for this homework, you must attain a total score of at least 21/30. You have unlimited attempts.

To test your code and run the autograder, execute `npm test` in the terminal. This will run the
autograder for all six problems. Ensure you are in the same directory as `autograder.js` and
`server.js` when you execute this command. If your autograder freezes, it is likely because you have
incorrect/missing logic in your work, resulting in an improper response to the client. To stop the autograder (and
many other programs in general), use Ctrl + C in the terminal that is running the program.

To submit, take a screenshot of all test results and your total score as printed in the terminal.
This homework will be DUE BY THE BEGINNING OF CLASS ON MONDAY, NOV 2 AT 6:00 PM.

The form to submit your screenshot(s) can be found here: https://docs.google.com/forms/d/e/1FAIpQLSdR4Rl-tW97u_t_19UKVXG9CqKg4IgKnLYnGeYpEKqsZR2OLQ/viewform

## Trying your routes yourself
You can also run your server with `node server.js` and visit `http://localhost:3000` in your browser
for GET routes. POST routes need a tool like Postman. Stop the server with Ctrl+C when you are done.

## Additional Notes
Routes are checked from top to bottom, and the first one that matches the request is used.
Keep this in mind when you decide where to put each new route.

DO NOT:
- write code outside of the `server.js` file.
- change anything below the "DO NOT change anything below this line" comment at the bottom of `server.js`
  (this is what lets the autograder access your server).
- rename or reassign the `tasks` array or the `nextId` variable. Add to the array and use `nextId`, but do not replace them.

Good luck, and don't hesitate to reach out for help!