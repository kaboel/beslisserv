const User = require('../_model/User');
const {
  passwordHash,
  passwordIsValid,
  generateToken,
} = require('../_auth/AuthMiddleware')

const registerNewUser = async (req, res) => {
  try {
    let user = User.find({ email: req.body.email });
    if (user.length >= 1) {
      return res.status(409).send(
        "Email is already in use."
      )
    }
    let hash = passwordHash(req.body.password)
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });
    await user.save().then(user => {
      res.status(200).send({
        auth: true,
        access_token: generateToken(user._id)
      })
    }).catch(err => {
      return res.status(500).send(
        "There was a problem registering the user."
      )
    });
  } catch (e) {
    return res.status(400).send(
      "Request error."
    )
  }
};

const loginUser = (req, res) => {
  User.findOne({ email: req.body.email },
    (err, user) => {
      if (err) {
        return res.status(500).send(
          "Error while logging in."
        );
      }
      if (!user) {
        return res.status(404).send(
          "Email not signed to any user."
        );
      }
      if (!passwordIsValid(req.body.password, user.password)) {
        return res.status(401).send({
          auth: false,
          access_token: null,
          message: "Password incorrect."
        });
      }

      res.status(200).send({
        auth: true,
        access_token: generateToken(user._id)
      });
    })
};

const getUserDetail = (req, res) => {
  User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err) {
      return res.status(500).send(
        "Error fetching user data."
      )
    }
    if (!user) {
      return res.status(404).send(
        "User not found."
      )
    }
    res.status(200).send(user);
  });
};

module.exports = {
  registerNewUser,
  loginUser,
  getUserDetail
}
