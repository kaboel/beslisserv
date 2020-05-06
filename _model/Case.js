const mongoose = require('mongoose');

const SCHEMA = mongoose.Schema({
  methodId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  alternatives: {
    type: Array,
    required: true
  },
});

const Case = mongoose.model('Case', SCHEMA, 'Cases');

module.exports = Case;
