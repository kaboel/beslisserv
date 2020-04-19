const router = require('express').Router()
const { verifyToken } = require('../../_middleware/AuthMiddleware');
const {
  registerNewUser,
  loginUser,
  getUserDetail
} = require('../../_controller/UserController')

router.post('/register', registerNewUser);
router.post('/register', loginUser);

// requests after next line are jwt-secured
router.get('/me', verifyToken,  getUserDetail);

module.exports = router;
