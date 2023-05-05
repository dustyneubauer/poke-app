const pool = require('../config/db');
const registerRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

registerRouter.post('/', async (req, res) => {
    const { firstName, lastName, password, username } = req.body;
    console.log(req.body);
    try{
      const data = await pool.query(`SELECT * FROM users WHERE username= $1`, [username]);
      const arr = data.rows;
      if (arr.length !== 0){
        return res.status(400).json({
          error: "Username already exists"
        });
      } else {
        bcrypt.hash(password, 10, (err,hash) => {
          if (err)
          res.status(err).json({
            error:"Server error",
          });
          const user = {
            firstName,
            lastName,
            username,
            password: hash,
          };
          let flag = 1;
          pool.query(`INSERT INTO users (first_name, last_name, password, username) VALUES ('${user.firstName}', '${user.lastName}', '${user.password}', '${user.username}') RETURNING *`, (error, results) => {
            if (error) {
              flag = 0;
              console.error(error);
              return res.status(500).json({
                error: "Database error"
              });
            } else {
            flag = 1;
              res.status(201).send('User added');
            }
          });
          if (flag) {
            const token = jwt.sign({
              username: user.username
            }, process.env.SECRET_KEY);
          };
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Database error while registering user!"
      })
    };
  })

module.exports = registerRouter;
