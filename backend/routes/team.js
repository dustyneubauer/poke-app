const pool = require('../config/db');
const teamRouter = require('express').Router();

teamRouter.post("/", (req, res, next) => {
    const {user, pokemonName, image, moveslist} = req.body
    const userData = 
})