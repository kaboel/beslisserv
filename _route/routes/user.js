const router = require('express').Router()
const { verifyToken } = require('../../_auth/AuthMiddleware');

const {
  registerNewUser,
  loginUser,
  getUserDetail
} = require('../../_controller/UserController')

router.post('/register', registerNewUser);
router.post('/register', loginUser);

router.get('/me', verifyToken,  getUserDetail);

module.exports = router;
