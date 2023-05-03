const express = require('express');
const apiRouter = express.Router();
const registerRouter = require('./routes/register');

apiRouter.use('/register', registerRouter);

module.exports = apiRouter;