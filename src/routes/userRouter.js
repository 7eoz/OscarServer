const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');

userRouter.get('/listAllUsers', userController.listAllUsers);

module.exports = userRouter;
