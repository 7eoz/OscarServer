const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');

userRouter.get('/listAllUsers', userController.listAllUsers);
userRouter.post('/searchUserByEmail', userController.searchUserByEmail);
userRouter.post('/createUser', userController.createUser);
userRouter.post('/auth', userController.auth);

module.exports = userRouter;
