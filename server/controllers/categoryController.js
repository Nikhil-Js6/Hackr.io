const Category = require('../models/Category');
const slugify = require('slugify');
const formidable = require('formidable');
const { v4 : uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

class CategoryController {

    async createCategory(req, res) {

        const { name, content, image } = req.body;
        const slug = slugify(name);

        const base64Img = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const type = image.split(';')[0].split('/')[1];

        const newCategory = new Category({ name, content, slug });

        const bucketParams = {
            Bucket: 'hackr.io-s3-nikhil',
            Key: `category/${uuidv4()}${slug}.${type}`,
            Body: base64Img,
            ACL: 'public-read',
            ContentType: `image/${type}`,
        }

        s3.upload(bucketParams, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: 'Can\'t Upload to s3'
                });
            }
            newCategory.image.url = data.Location;
            newCategory.image.key = data.Key;
            newCategory.postedBy = req.user._id;

            newCategory.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        message: 'Can\'t Create Category!'
                    })
                }
                return res.status(201).json({
                    message: `${name} Created Successfully!`,
                    data
                });
            });
        });
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
    
    // using Form Data:
    
//     async createCategory(req, res) {

    //     const form = new IncomingForm();

    //     form.parse(req, (err, fields, files) => {
    //         if (err) {
    //             return res.status(400).json({
    //                 message: 'Can\'t Upload Image!'
    //             });
    //         }
    //         const { name, content } = fields;
    //         const { image } = files;
    //         const slug = slugify(name);

    //         const newCategory = new Category({ name, content, slug });

    //         if (!image) {
    //             return res.status(400).json({
    //                 message: 'Image is required'
    //             })
    //         }
    //         if (image.size > 2000000) {
    //             return res.status(400).json({
    //                 message: 'Image should be less than 2MB.'
    //             });
    //         }

    //         // s3 bucket instance:
    //         const bucketParams = {
    //             Bucket: 'hackr.io-s3-nikhil',
    //             Key: `category/${uuidv4()}`,
    //             Body: fs.readFileSync(image.filepath), // to read file synchronously
    //             ACL: 'public-read',
    //             ContentType: 'image/jpg',
    //         }

    //         s3.upload(bucketParams, (err, data) => {
    //             if (err) {
    //                 console.log(err);
    //                 return res.status(400).json({
    //                     message: 'Can\'t Upload to s3'
    //                 });
    //             }
    //             newCategory.image.url = data.Location;
    //             newCategory.image.key = data.Key;
    //             newCategory.postedBy = req.user._id;

    //             newCategory.save((err, data) => {
    //                 if (err) {
    //                     return res.status(400).json({
    //                         message: 'Can\'t Create Category!'
    //                     })
    //                 }
    //                 return res.status(201).json({
    //                     message: 'Category Created Successfully!',
    //                     data
    //                 });
    //             })
    //         });
    //     });
    // }
    
}

module.exports = new CategoryController();
