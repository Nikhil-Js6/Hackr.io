const { check }  = require('express-validator');

exports.linkValidator = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    check('url')
        .not()
        .isEmpty()
        .withMessage('URL is required'),
    check('categories')
        .not()
        .isEmpty()
        .withMessage('Category is required'),
    check('type')
        .not()
        .isEmpty()
        .withMessage('Pick a type Free/Paid'),
    check('medium')
        .not()
        .isEmpty()
        .withMessage('Pick a medium Video/Book/Article'),
];