const express = require('express');
const apiRouter = express.Router();
const userRouter = require('./routes/users');

apiRouter.use('/users', userRouter);

module.exports = apiRouter;