const express = require('express');
const app = express();
const PORT = 3000;
const supabase = require('./supabaseClient');



app.listen(PORT, () => {
    console.log(`Server is listening on port ${3000}.`);
});