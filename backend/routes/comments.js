const pool = require('../config/db');
const commentsRouter = require('express').Router();

commentsRouter.post("/", async (req, res)=>{
    const { userId, comment, commentId } = req.body
    console.log(req.body)
    try {
        pool.query(`INSERT INTO comment (id, user_id, text) VALUES ('${commentId}', '${userId}', '${comment}')`, (error, results)=>{
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: "Database error"
                });
            } else {
                return res.status(201).send('Comments Saved');
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal error occured when saving comment"
        })
    }
})

commentsRouter.get("/:userId", async (req, res)=>{
    const {userId} = req.params;
    const data = await pool.query(`SELECT * FROM comment WHERE user_id = ${userId}`);
    const comments = data.rows;
    console.log(comments);
    return res.status(201).send(comments);
})

commentsRouter.delete("/:commentId", async (req,res) => {
    const {commentId} = req.params;
    pool.query(`DELETE FROM comment WHERE id = ${commentId}`);
    return res.status(200).send({
        success: 'true',
        message: "comment successfully deleted"
    })
})

module.exports = commentsRouter;