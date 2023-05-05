const express = require('express');
const apiRouter = express.Router();
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login')

apiRouter.use('/register', registerRouter);
apiRouter.use('/login', loginRouter);

module.exports = apiRouter;