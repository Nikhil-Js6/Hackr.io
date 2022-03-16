const jwt = require('jsonwebtoken');
const User = require('../models/User');

function verify (req, res, next) {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err) {
                return res.status(403).json({
                    message: 'Invalid Token!'
                });
            }
            req.user = data;
            next();
        });
    }
    else {
        return res.status(401).json({
            message: 'You are not Authenticated!'
        });
    }
}

module.exports = verify;
