const express = require('express');
const connectToDb = require('./db/dbConnect');
const userRouter = require('./routes/user.router');

const app = express();
connectToDb();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res,) => {
    res.send("<h1>Hello App</h1>");
});
app.use('/users', userRouter);

module.exports = app;
