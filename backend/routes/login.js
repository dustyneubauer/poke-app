const pool = require('../config/db');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const data = await pool.query(`SELECT * FROM users WHERE username= $1 RETURNING id;`, [username])
        const user = data.rows;

        if (user.length === 0) {
            res.status(400).json({
                error: "User is not registered, please sign up"
            });
        } else {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: "Server error",
                    });
                } else if (result === true) {
                    const token = jwt.sign({
                        username: username,
                        id: user.id,
                    }, process.env.SECRET_KEY
                    );

                    return res.json({
                        token: token,
                        userName: user[0].username,
                        userId: user[0].id
                    });
                }
                else {
                    if (result !== true) {
                        return res.status(400).json({
                            error: "Enter correct password!",
                        });
                    }
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Interal error occurred while signing in!"
        });
    };
});


module.exports = loginRouter;