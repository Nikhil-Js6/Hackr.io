const User = require('../models/User');
const jwt = require('jsonwebtoken');
const AWS = require("aws-sdk");
const emailParams = require("../util/email");
const shortid = require('shortid');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const ses = new AWS.SES({apiVersion: '2010-12-01'});

class AuthController {
    
    async register(req, res) {

        const { name, email, password } = req.body;

    // Check if email already exists:
        User.findOne({email}).exec((err, user) => {
            if(user){
                return res.status(400).json({
                    message: 'Email is already Taken',
                });
            }
            console.log(err);
            
        // Generate JWT:
            const token = jwt.sign(
                { name, email, password },
                process.env.JWT_ACCOUNT_ACTIVATION,
                { expiresIn: '10min' }
            );

        // Send verifiation email:
            const params = emailParams(name, email, token);
            const sendVerificationEmail = ses.sendEmail(params).promise();
    
            sendVerificationEmail
            .then((data) => {
                console.log("Email sent", data);
                res.status(200).json({
                    message: `Email has been sent to ${email}. Follow the instruction to finish registration`
                });
            })
            .catch(err => {
                console.log("Email failed!", err);
                res.status(400).json({
                    message: "Could not verify your email. Please try again."
                });
            }); 
        });          
    }

    async activate(req, res) {
        const { token } = req.body;
        console.log(token);
        if (token) {
            jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, data) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Invalid link. Plaese try again!'
                    });
                }
                const { name, email, password } = data;
                const username = shortid.generate();

            // Create new user:
                const newUser = new User({name, username, email, password});
                newUser.save((err, user) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Error saving the user'
                        })
                    }
                    res.status(201).json({
                        message: 'Registration Success. Please login'
                    })
                })
            });
        }
    }
}

module.exports = new AuthController();
