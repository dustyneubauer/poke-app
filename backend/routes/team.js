const pool = require('../config/db');
const teamRouter = require('express').Router();

teamRouter.post("/", async (req, res, next) => {
    const { userId, team } = req.body
    console.log(team);
    const data = await pool.query(`SELECT * FROM team WHERE user_id = ${userId}`)
    if (data) {
        pool.query(`DELETE FROM team WHERE user_id = ${userId}`)
    }
    try {
        pool.query(`INSERT INTO team (user_id, pokemon) VALUES ('${userId}','{${team}}')`, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: "Database error"
                });
            } else {
                return res.status(201).send('Team Saved');
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Interal error occurred while saving team!"
        });
    };
});

teamRouter.get("/:userId", async (req, res) => {
    const {userId} = req.params;
    const data = await pool.query(`SELECT pokemon FROM team WHERE user_id = ${userId}`);
    const team = data.rows[0];
    console.log(team);
    return res.status(201).send(team);
})

module.exports = teamRouter;