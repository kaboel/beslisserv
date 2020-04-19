const router = require('express').Router();

router.use('/user', require('./routes/user'))

module.exports = router;
