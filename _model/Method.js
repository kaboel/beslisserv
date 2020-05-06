const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

const Method = mongoose.model('Method', Schema,  'Methods');

module.exports = Method;
