const User = require('./controller/UserController');

module.exports = (App) => {

  App.post('/user/register', User.register)
  App.post('/user/login', User.login)
  App.get('/user/detail', User.getUserDetail)

}
