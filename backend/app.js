const express = require('express');
const connectToDb = require('./db/dbConnect');

const app = express();
connectToDb();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
    res.send("<h1>Hello App</h1>");
});

module.exports = app;
