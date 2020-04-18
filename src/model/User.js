const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SCHEMA = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"]
  },
  email: {
    type: String,
    require: [true, "Email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// Hash Creds
SCHEMA.pre("save", async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Generate JWT
SCHEMA.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email
  }, "beslissecret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}

// Match Creds
SCHEMA.statics.findByCredentials = async function(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login info." });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login info.' });
  }
  return user;
}

const User = mongoose.model('User', SCHEMA, 'Users');

module.exports = User;
