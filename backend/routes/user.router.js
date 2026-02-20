const express = require('express');
const { postLogin, postRegister } = require('../controller/user.controller');
const userRouter = express.Router();

userRouter.post('/login', postLogin);
userRouter.post('/register', postRegister);

module.exports = userRouter;
