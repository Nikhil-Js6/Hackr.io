const router = require('express').Router();
const { register, activate, login } = require('../controllers/authController');

const { userRegisterValidator, userLoginValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

// Routes

router.post('/register', userRegisterValidator, runValidation, register);
router.post('/account/activate', activate);
router.post('/login', userLoginValidator, runValidation, login);


module.exports = router;
