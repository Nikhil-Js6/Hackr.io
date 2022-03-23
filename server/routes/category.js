const router = require('express').Router();

const { 
    getCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory } 
    = require('../controllers/categController');

const { categoryCreateValidator, categoryUpdateValidator } = require('../validators/category');

const { runValidation } = require('../validators');
const { verifyAdmin } = require('../middlewares/verifyToken');


router.post('/category/create', categoryCreateValidator, runValidation, verifyAdmin, createCategory);
router.put('/categories/:slug', categoryUpdateValidator, runValidation, verifyAdmin, updateCategory);
router.delete('/categories/:slug', verifyAdmin, deleteCategory);
router.get('/categories/get', getCategories);

module.exports = router;
