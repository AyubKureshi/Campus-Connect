const express = require('express');
const {
  postLogin,
  postRegister,
  getCurrentUser,
  updateCurrentUser,
} = require('../controller/user.controller');
const { authUser } = require('../middleware/auth.middleware');
const userRouter = express.Router();

userRouter.post('/login', postLogin);
userRouter.post('/register', postRegister);
userRouter.get('/me', authUser, getCurrentUser);
userRouter.put('/me', authUser, updateCurrentUser);

module.exports = userRouter;
