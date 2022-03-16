const { check }  = require('express-validator');

exports.userRegisterValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('username')
        .isEmpty()
        .withMessage('Username is empty'),
    check('email')
        .isEmail()
        .withMessage('Email must be valid'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long'),
];

exports.userLoginValidator = [
    check('email')
        .isEmail()
        .withMessage('Email must be valid'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long'),
];
