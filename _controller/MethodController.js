const Method = require('../_model/Method');

const getAllMethods = (req, res) => {
  Method.find({}, (err, methods) =>  {
    if (err) {
      return res.status(400).send({
        message: "An error has occurred while fetching methods."
      })
    }
    res.status(200).send(methods)
  })
}

module.exports = {
  getAllMethods
}
