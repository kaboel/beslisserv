const App = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./config/db')
const port = process.env.PORT || 4400
const prefix = `/v0`

App.use(cors())
App.use(morgan('combined'))
App.use(bodyParser.json())
App.use(bodyParser.urlencoded({ extended: true }))

require('./routes')(App)

mongoose.connect(db.dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database...\n.\n\.\n.')

    try {
      App.listen(port, () => {
        console.log(`Server started on port: ${port}...`)
      })
    } catch (err) {
      console.log(`Server failed to start. | ${err.message}`)
    }
  }).catch(err => {
    console.log(`Cannot connect to database. | ${err.message}`)
  })
