const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../config');
const User = require('../_model/User');

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
    { expiresIn: 604800 } //exp. in 7-days
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
    User.findById(decoded.id).then(user => {
      if (!user) {
        return res.status(500).send({
          auth: false,
          message: "Token Error. User not found."
        });
      }
      req.userId = decoded.id;
      next();
    }).catch(err => {
      return res.status(500).send({
        auth: false,
        message: "Token Error. Error fetching user data."
      });
    });
  });
}

module.exports = {
  passwordHash,
  passwordIsValid,
  verifyToken,
  generateToken
}
