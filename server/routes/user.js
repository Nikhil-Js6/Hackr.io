const router = require('express').Router();

const { getUser } = require('../controllers/userController');
const { verifyUser, verifyAdmin } = require('../middlewares/verifyToken');

// Routes
router.get('/user', verifyUser, getUser);
router.get('/admin', verifyAdmin, getUser);

module.exports = router;