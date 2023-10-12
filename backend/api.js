const express = require('express');
const apiRouter = express.Router();
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const teamRouter = require('./routes/team');
const commentsRouter = require('./routes/comments')

apiRouter.use('/register', registerRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/team', teamRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;