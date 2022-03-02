const router = require('express').Router();
const { register, activate } = require('../controllers/authController');

const { userRegisterValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

// Routes
router.post('/register/', userRegisterValidator, runValidation, register);
router.post('/account/activate', activate);


module.exports = router;
