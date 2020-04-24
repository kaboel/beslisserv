const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config');

const passwordHash = async (password) => {
  return await bcrypt.hash(password, 8);
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
  let token = req.headers['access_token'];
  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "No access_token provided."
    });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        auth: false,
        message: "Expired access_token provided."
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
