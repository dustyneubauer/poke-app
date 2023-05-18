const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
    const token = req.headers.authorization
    try {
        var decoded = jwt.verify(token, process.env.SECRET_KEY);
        return next();
      } catch(err) {
        return next(err);
      }
}

module.exports = verifyJwt;
