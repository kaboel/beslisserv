const App = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { name, port, dbUri } = require('./config');

App.use(cors());
App.use(morgan('combined'));

App.use(bodyParser.urlencoded({ extended: true }))
App.use(bodyParser.json());

App.use('/v0', require('./_route'));

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(`Connected to database...\n.\n.\n.`);
  try {
    App.listen(port, () => {
      console.log(`Server started on port: ${port}...`)
    })
  } catch (e) {
    console.log(`Server failed to start. | ${e}`)
  }
}).catch((e) => {
  console.log(`Cannot connect to database. | ${e}`)
})
