const router = require('express').Router();

router.use('/user', require('./routes/user'))
router.use('/method', require('./routes/method'))

module.exports = router;
