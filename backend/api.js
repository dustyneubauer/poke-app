const express = require('express');
const apiRouter = express.Router();
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const teamRouter = require('./routes/team');

apiRouter.use('/register', registerRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/team', teamRouter);

module.exports = apiRouter;