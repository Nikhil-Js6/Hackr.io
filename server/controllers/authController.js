const User = require('../models/User');
const jwt = require('jsonwebtoken');
const AWS = require("aws-sdk");
const bcrypt = require("bcrypt");
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

        //Generate hashed password:
            const hashed_password = bcrypt.hashSync(password, 12);
            
        // Generate JWT:
            const token = jwt.sign(
                { name, email, hashed_password },
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
        if (token) {
            jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, data) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Invalid link. Please try again!'
                    })
                }
                const { name, email, hashed_password } = data;
                const username = shortid.generate();

            // Create new user:
                User.findOne({email}).exec((err, user) => {
                    if(user){
                        return res.status(403).json({
                            message: 'Account is already registered!'
                        })
                    }
                    const newUser = new User({ name, username, email, hashed_password });
                    newUser.save((err, user) => {
                        if (err) {
                            return res.status(401).json({
                                message: 'Error saving the user!'
                            })
                        }
                        res.status(201).json({
                            message: 'Registration Success. Please login'
                        })
                    })
                })  
            });
        }
    }

    async login(req, res) {

        const { email, password} = req.body;
        
        User.findOne({email}).exec((err, user) => {

            if(!user){
                return res.status(401).json({
                    message: 'User Email not found!'
                });
            }
            if(err) {
                return res.status(500).json({
                    message: 'Something went wrong!'
                })
            }
            
            const validPassword = bcrypt.compareSync(password, user.hashed_password);
            if(!validPassword) return res.status(401).json({
                message: 'Wrong Credentials!'
            })

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            const { _id, name, email, role } = user;
            return res.status(200).json({ 
                token,
                user: {
                    _id, name, email, role
                }
            });
        });

    // Using try-catch:
        // try {
        //     const user = User.findOne({ email });
        //     if(!user){
        //         return res.status(401).json({
        //             message: 'User not found!'
        //         })
        //     }
        //     const validPassword = bcrypt.compareSync(password, user.hashed_password);
        //     !validPassword && res.status(401).json({
        //         message: 'Wrong Credentials!'
        //     })

        //     // Generate tokens
        //     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        //     // const { name, email, password } = user;
        //     return res.status(200).json({ 
        //         token,
        //         user 
        //     });
        // }catch(err) {
        //     console.log(err);
        //     res.status(500).json({
        //         message: 'Something went wrong!'
        //     })
        // }
    }
}

module.exports = new AuthController();
