const App = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { name, port, dbUri } = require('./_config/config');

App.use(cors());
App.use(morgan('combined'));

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
