const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const { isEmail } = require('validator')

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [ isEmail, "enter a valid email" ],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [ 8, "password must be at least 8 characters"]
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: [ 8, "password must be at least 8 characters" ]
    },
    phoneNumber: {
        type: String,
        required: true,
        minLength: 11,
        maxLength: 14
    },
    alternatePhoneNumber: {
        type: String,
        required: true,
        minLength: 11,
        maxLength: 14
    },
    alternatePhoneNumber2: {
        type: String,
        minLength: 11,
        maxLength: 14
    },
    role: {
        type: Number,
        enum: [ 1, 0],
        default: 0
    }
    
})


const User = mongoose.model('User', userSchema);

module.exports = User;