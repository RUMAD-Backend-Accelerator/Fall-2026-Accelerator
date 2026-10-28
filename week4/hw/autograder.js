// Stops Express from printing error stack traces into the autograder output.
process.env.NODE_ENV = 'test';

const request = require('supertest');
const { isDeepStrictEqual } = require('node:util');

// --- Loading the student's server ---

// Every test gets its own brand-new copy of server.js. This matters because the
// server keeps state (the tasks array AND the nextId counter), so one test must
// never be able to affect another.
const serverPath = require.resolve('./server');

// The autograder always starts every test from this exact list of tasks.
const SEED_TASKS = [
    { id: 1, title: 'Do Backend Accelerator HW', isCompleted: false },
    { id: 2, title: 'Prepare for Data Structures Midterm', isCompleted: false },
    { id: 3, title: 'Update LinkedIn Profile', isCompleted: true }
];

const seedCopy = () => SEED_TASKS.map((task) => ({ ...task }));

const loadFreshServer = () => {
    delete require.cache[serverPath];
    const loaded = require(serverPath);

    if (!loaded || !loaded.app || !loaded.tasks) {
        throw new Error('server.js must export { app, tasks }. Do not change the module.exports line at the bottom of server.js');
    }

    const { app, tasks } = loaded;
    tasks.length = 0;
    for (const task of seedCopy()) {
        tasks.push(task);
    }

    return { app, tasks };
};

// Make sure server.js can be loaded at all before running any tests.
try {
    loadFreshServer();
} catch (error) {
    console.log(`Could not load server.js: ${error.message}`);
    process.exit(1);
}

// --- Helpers ---

const show = (value) => JSON.stringify(value);

// Describes what the server actually sent back, in a short readable form.
const describeBody = (res) => {
    if (Array.isArray(res.body) || (res.body && Object.keys(res.body).length > 0)) {
        return show(res.body);
    }

    // Express sends an HTML page like "Cannot POST /tasks" when no route matches.
    const htmlMessage = /<pre>([\s\S]*?)<\/pre>/.exec(res.text || '');
    const text = htmlMessage ? htmlMessage[1] : (res.text || '');

    if (text === '') {
        return '(an empty body)';
    }
    return text.length > 150 ? `"${text.slice(0, 150)}..."` : `"${text}"`;
};

// Returns null if the response matches, or a message describing the mismatch.
const checkResponse = (label, res, expectedStatus, expectedBody) => {
    if (res.status !== expectedStatus || !isDeepStrictEqual(res.body, expectedBody)) {
        return `${label} returned status ${res.status} with body ${describeBody(res)}, ` +
            `but should have returned status ${expectedStatus} with body ${show(expectedBody)}.`;
    }
    return null;
};

// Error responses only need the right status and an { error: '...' } object.
const checkError = (label, res, expectedStatus) => {
    if (res.status !== expectedStatus || !res.body || typeof res.body.error !== 'string') {
        return `${label} returned status ${res.status} with body ${describeBody(res)}, ` +
            `but should have returned status ${expectedStatus} with an error object like { "error": "..." }.`;
    }
    return null;
};

// Checks that the tasks array (the one exported by server.js) has the expected contents.
const checkTasks = (label, tasks, expectedTasks) => {
    if (!isDeepStrictEqual(tasks, expectedTasks)) {
        return `After ${label}, the tasks array was ${show(tasks)}, ` +
            `but should have been ${show(expectedTasks)}.`;
    }
    return null;
};

// Runs checks in order and returns the first failure message, or null if all pass.
const firstFailure = (...results) => results.find((result) => result !== null) || null;

// Expected tasks after adding the given tasks to the end of the seed list.
const seedPlus = (...newTasks) => [...seedCopy(), ...newTasks];

// --- Problems ---
// Each test receives a fresh { app, tasks } and returns null (pass) or a failure message.

const testProblem1 = () => runProblem(1, [
    async ({ app }) => {
        const res = await request(app).get('/tasks/count');
        return checkResponse('GET /tasks/count', res, 200, { count: 3 });
    },
    async ({ app, tasks }) => {
        // The count must be calculated from the current tasks, not hard-coded.
        tasks.push({ id: 4, title: 'Extra task', isCompleted: false });
        const res = await request(app).get('/tasks/count');
        return checkResponse('GET /tasks/count with 4 tasks stored', res, 200, { count: 4 });
    }
]);

const testProblem2 = () => runProblem(2, [
    async ({ app }) => {
        const res = await request(app).get('/tasks/2');
        return checkResponse('GET /tasks/2', res, 200, SEED_TASKS[1]);
    },
    async ({ app }) => {
        const res = await request(app).get('/tasks/3');
        return checkResponse('GET /tasks/3', res, 200, SEED_TASKS[2]);
    },
    async ({ app }) => {
        const res = await request(app).get('/tasks/0');
        return checkError('GET /tasks/0', res, 404);
    },
    async ({ app }) => {
        const res = await request(app).get('/tasks/abc');
        return checkError('GET /tasks/abc', res, 404);
    }
]);

const testProblem3 = () => runProblem(3, [
    async ({ app }) => {
        const res = await request(app).get('/tasks');
        return checkResponse('GET /tasks', res, 200, SEED_TASKS);
    },
    async ({ app }) => {
        const res = await request(app).get('/tasks?completed=false');
        return checkResponse('GET /tasks?completed=false', res, 200, [SEED_TASKS[0], SEED_TASKS[1]]);
    },
    async ({ app }) => {
        const res = await request(app).get('/tasks?completed=true');
        return checkResponse('GET /tasks?completed=true', res, 200, [SEED_TASKS[2]]);
    },
    async ({ app }) => {
        const res = await request(app).get('/tasks?search=linkedin');
        return checkResponse('GET /tasks?search=linkedin', res, 200, [SEED_TASKS[2]]);
    },
    async ({ app }) => {
        // The search must ignore upper and lower case.
        const res = await request(app).get('/tasks?search=PREPARE');
        return checkResponse('GET /tasks?search=PREPARE', res, 200, [SEED_TASKS[1]]);
    },
    async ({ app }) => {
        const res = await request(app).get('/tasks?search=zzz');
        return checkResponse('GET /tasks?search=zzz', res, 200, []);
    },
    async ({ app }) => {
        const res = await request(app).get('/tasks?completed=false&search=prep');
        return checkResponse('GET /tasks?completed=false&search=prep', res, 200, [SEED_TASKS[1]]);
    },
    async ({ app }) => {
        // "k" appears in tasks 1 ("Backend") and 3 ("LinkedIn") but not task 2. Only task 1
        // is not completed, so both filters have to work together to get the right answer.
        const res = await request(app).get('/tasks?completed=false&search=k');
        return checkResponse('GET /tasks?completed=false&search=k', res, 200, [SEED_TASKS[0]]);
    }
]);

const testProblem4 = () => runProblem(4, [
    async ({ app }) => {
        const res = await request(app).post('/tasks').send({ title: 'Buy milk' });
        return checkResponse('POST /tasks with body {"title":"Buy milk"}', res, 201,
            { id: 4, title: 'Buy milk', isCompleted: false });
    },
    async ({ app, tasks }) => {
        await request(app).post('/tasks').send({ title: 'Buy milk' });
        return checkTasks('POST /tasks with body {"title":"Buy milk"}', tasks,
            seedPlus({ id: 4, title: 'Buy milk', isCompleted: false }));
    },
    async ({ app }) => {
        // IDs go up by 1 for every new task.
        await request(app).post('/tasks').send({ title: 'First' });
        const res = await request(app).post('/tasks').send({ title: 'Second' });
        return checkResponse('a second POST /tasks', res, 201,
            { id: 5, title: 'Second', isCompleted: false });
    },
    async ({ app, tasks }) => {
        const res = await request(app).post('/tasks').send({});
        return firstFailure(
            checkError('POST /tasks with body {}', res, 400),
            checkTasks('POST /tasks with body {}', tasks, seedCopy())
        );
    },
    async ({ app, tasks }) => {
        const res = await request(app).post('/tasks').send({ title: '   ' });
        return firstFailure(
            checkError('POST /tasks with a blank title', res, 400),
            checkTasks('POST /tasks with a blank title', tasks, seedCopy())
        );
    },
    async ({ app }) => {
        // A request that fails does not create a task, so it must not use up an ID.
        await request(app).post('/tasks').send({});
        const res = await request(app).post('/tasks').send({ title: 'Buy milk' });
        return checkResponse('POST /tasks after a failed POST /tasks', res, 201,
            { id: 4, title: 'Buy milk', isCompleted: false });
    }
]);

const testProblem5 = () => runProblem(5, [
    async ({ app }) => {
        const res = await request(app).post('/tasks/bulk').send({ titles: ['A', 'B', 'C'] });
        return checkResponse('POST /tasks/bulk with titles ["A","B","C"]', res, 201, [
            { id: 4, title: 'A', isCompleted: false },
            { id: 5, title: 'B', isCompleted: false },
            { id: 6, title: 'C', isCompleted: false }
        ]);
    },
    async ({ app, tasks }) => {
        await request(app).post('/tasks/bulk').send({ titles: ['A', 'B', 'C'] });
        return checkTasks('POST /tasks/bulk with titles ["A","B","C"]', tasks, seedPlus(
            { id: 4, title: 'A', isCompleted: false },
            { id: 5, title: 'B', isCompleted: false },
            { id: 6, title: 'C', isCompleted: false }
        ));
    },
    async ({ app, tasks }) => {
        // If any title is blank, nothing at all should be added.
        const res = await request(app).post('/tasks/bulk').send({ titles: ['Valid', '   '] });
        return firstFailure(
            checkError('POST /tasks/bulk with titles ["Valid","   "]', res, 400),
            checkTasks('POST /tasks/bulk with titles ["Valid","   "]', tasks, seedCopy())
        );
    },
    async ({ app, tasks }) => {
        const res1 = await request(app).post('/tasks/bulk').send({});
        const res2 = await request(app).post('/tasks/bulk').send({ titles: 'A' });
        return firstFailure(
            checkError('POST /tasks/bulk with body {}', res1, 400),
            checkError('POST /tasks/bulk with titles "A" (not an array)', res2, 400),
            checkTasks('POST /tasks/bulk with an invalid body', tasks, seedCopy())
        );
    },
    async ({ app, tasks }) => {
        const res = await request(app).post('/tasks/bulk').send({ titles: [] });
        return firstFailure(
            checkError('POST /tasks/bulk with titles []', res, 400),
            checkTasks('POST /tasks/bulk with titles []', tasks, seedCopy())
        );
    },
    async ({ app }) => {
        // POST /tasks and POST /tasks/bulk share the same ID counter.
        await request(app).post('/tasks/bulk').send({ titles: ['A', 'B'] });
        const res = await request(app).post('/tasks').send({ title: 'C' });
        // Only the id is checked here, so mistakes in Problem 4 don't also cost points in Problem 5.
        if (!res.body || res.body.id !== 6) {
            return `POST /tasks after POST /tasks/bulk added 2 tasks returned status ${res.status} with body ` +
                `${describeBody(res)}, but the new task should have had id 6.`;
        }
        return null;
    }
]);

const testProblem6 = () => runProblem(6, [
    async ({ app }) => {
        const res = await request(app).post('/tasks/1/complete');
        return checkResponse('POST /tasks/1/complete', res, 200,
            { id: 1, title: 'Do Backend Accelerator HW', isCompleted: true });
    },
    async ({ app, tasks }) => {
        await request(app).post('/tasks/1/complete');
        const expected = seedCopy();
        expected[0].isCompleted = true;
        return checkTasks('POST /tasks/1/complete', tasks, expected);
    },
    async ({ app, tasks }) => {
        // Completing a task that is already completed leaves it completed.
        const res = await request(app).post('/tasks/3/complete');
        return firstFailure(
            checkResponse('POST /tasks/3/complete', res, 200, SEED_TASKS[2]),
            checkTasks('POST /tasks/3/complete', tasks, seedCopy())
        );
    },
    async ({ app, tasks }) => {
        const res = await request(app).post('/tasks/99/complete');
        return firstFailure(
            checkError('POST /tasks/99/complete', res, 404),
            checkTasks('POST /tasks/99/complete', tasks, seedCopy())
        );
    }
]);

// --- Test runner ---

const runProblem = async (number, tests) => {
    console.log(`--- PROBLEM ${number} ---`);

    let pointsEarned = 0;

    for (let i = 0; i < tests.length; i++) {
        let testResult = `TEST ${i + 1} (`;

        try {
            const failure = await tests[i](loadFreshServer());

            if (failure === null) {
                pointsEarned++;
                testResult += 'PASS)';
            } else {
                testResult += `FAIL): ${failure}`;
            }
        } catch (error) {
            testResult += `ERROR): ${error.message}.`;
        }

        console.log(testResult);
    }

    let problemResult = `${pointsEarned}/${tests.length} tests passed`;
    problemResult += (pointsEarned === tests.length) ? '!' : '.';
    console.log(problemResult);

    return { earned: pointsEarned, worth: tests.length };
};

// --- Run tests and calculate the total score ---

const main = async () => {
    let totalPointsEarned = 0;
    let totalPointsWorth = 0;

    const problemTests = [testProblem1, testProblem2, testProblem3, testProblem4, testProblem5, testProblem6];

    for (const testProblem of problemTests) {
        const points = await testProblem();
        totalPointsEarned += points.earned;
        totalPointsWorth += points.worth;
        console.log();
    }

    const percentScore = Math.round((totalPointsEarned / totalPointsWorth * 100) * 100) / 100;
    console.log(`Total score: ${totalPointsEarned}/${totalPointsWorth} (${percentScore}%)`);
};

main();