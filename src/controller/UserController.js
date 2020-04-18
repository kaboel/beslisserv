const User = require('../model/User');

const register = async (req, res) => {
  try {
    let user = await User.find({ email: req.body.email });
    if (user.length >= 1) {
      res.status(409).send({
        message: "Email is already in use."
      });
      return 0;
    }
    user = new User(req.body);
    const data = await user.save();
    const token = user.generateAuthToken();
    res.status(200).send({
      data, token
    });

  } catch (e) {
    res.status(400).send({
      err: e,
      message: "An error has occured while registering user"
    });
  }
}

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      res.status(401).send({
        message: "Invalid Email or Password."
      });
      return 0;
    }
    const token = await user.generateAuthToken();
    res.status(200).send({
      user, token
    });

  } catch (e) {
    res.status(400).send({
      err: e,
      message: 'An error has occured while signing in.'
    });
  }
}

const getUserDetail = async (req,  res) => {

}

module.exports = {
  register,
  login,
  getUserDetail
}
