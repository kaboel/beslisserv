const router = require('express').Router();
const { verifyToken } = require('../../_middleware/AuthMiddleware');
const {
  getAllMethods
} = require('../../_controller/MethodController');

// requests after next line are jwt-secured
// access_token is required to access these requests
router.get('/all', verifyToken, getAllMethods);

module.exports = router
