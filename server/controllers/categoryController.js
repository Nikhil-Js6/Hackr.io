const Category = require('../models/Category');
const slugify = require('slugify');
const formidable = require('formidable');
const { v4 : uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

class CategoryController {

    async createCategory(req, res) {

    }
    
    async getCategories(req, res) {
        const slug = req.query.category;
        if (slug === 'all') {
            try {
                const categories = await Category.find();
                return res.status(200).json({
                    message: 'Successfully Fetched All Categories!',
                    categories
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: 'Can\'t Load Categories'
                })
            }
        }
        else{
            try {
                const categories = await Category.find({ slug });
                return res.status(200).json({
                    message: `Successfully Fetched ${slug} Category!`,
                    categories
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: 'Can\'t Load Categories'
                })
            }
        }
    }

    async updateCategory(req, res) {

    }

    async deleteCategory(req, res) {

    }
    
}

module.exports = new CategoryController();
