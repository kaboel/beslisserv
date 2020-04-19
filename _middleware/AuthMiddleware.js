const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config');

const passwordHash = (password) => {
  return bcrypt.hash(password, 8);
}

const passwordIsValid = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    secret,
    { expiresIn: 86400 }
  );
}

const verifyToken = (req, res, next) => {
  var token = req.headers['access_token'];
  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "No access_token provided."
    });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Failed to verify token."
      });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  passwordHash,
  passwordIsValid,
  verifyToken,
  generateToken
}
