const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 3,
        max: 20,
        trim: true,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        max: 32,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    resetPasswordLink: {
        data: String,
        default: '',
    },
    role: {
        type: String,
        default: 'user',
    }
},
    {timestamps: true, timeseries: true},
);

// virtual fields
userSchema.virtual('password')
    .set((password) => {
        // temp var _password
        this._password = password;
        // gen salt
        this.salt = this.genSalt();
        // encrypt password
        this.hashed_password = this.encryptPassword(password);
    })
    .get(() => {
        return this._password;
    })

// methods => authenticate, genSalt, encryptPassword
userSchema.methods = {

    authenticate: function(plainText){
        // encrypt the plain text and compare with the hashed password 
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password) {
        if(!password) '';
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(password)
                .digest('hex');
        }catch (err) {
            return '';
        }
    },
    genSalt: () => {
        return crypto.randomBytes(16).toString('hex');
    },
}

module.exports = new mongoose.model("User", userSchema);
