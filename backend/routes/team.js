const pool = require('../config/db');
const teamRouter = require('express').Router();

teamRouter.post("/", (req, res, next) => {
    const {pokemonName, image, moveslist} = req.body
    
})