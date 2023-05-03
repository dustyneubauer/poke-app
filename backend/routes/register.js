const pool = require('../config/db');
const registerRouter = require('express').Router();

registerRouter.post('/', (req, res) => {
    const { firstName, lastName, password, username } = req.body;
    pool.query(`INSERT INTO users (first_name, last_name, password, username) VALUES ('${firstName}', '${lastName}', '${password}', '${username}') RETURNING *`, (error, results) => {
      if (error) {
        return res.status(500).json({
          message: error.message
        });
      }
      res.status(201).send('User added');
    });
  });

module.exports = registerRouter;
