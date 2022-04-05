const router = require('express').Router();

const { getLinks, createLink, updateLink, deleteLink } = require('../controllers/linkController');

const { linkValidator } = require('../validators/link');

const { runValidation } = require('../validators');
const { verifyUser } = require('../middlewares/verifyToken');


router.post('/link/create', linkValidator, runValidation, verifyUser, createLink);
router.put('/links/:id', linkValidator, runValidation, verifyUser, updateLink);
router.delete('/links/:id', verifyUser, deleteLink);
router.get('/links/get', getLinks);

module.exports = router;
