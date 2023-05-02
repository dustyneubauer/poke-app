const pool = require('../config/db');
const userRouter = require('express').Router();

userRouter.post('/', (req, res) => {
    const { firstName, lastName, password, username } = req.body;
    console.log(req);
    pool.query(`INSERT INTO users (first_name, last_name, password, username) VALUES ('${firstName}', '${lastName}', '${password}', '${username}') RETURNING *`, (error, results) => {
      if (error) {
        return res.status(500).json({
          message: error.message
        });
      }
      res.status(201).send('User added');
    });
  });

  module.exports = userRouter;