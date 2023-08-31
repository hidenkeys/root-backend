const mongoose = require('mongoose')
const Schema = mongoose.Schema

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    oneTP: {
        type: Number,
        maxLength: 6,
        minLength: 6,
        unique: true
    },
    createdAt: { 
        type: Date, 
        expires: '2m', 
        default: Date.now 
    }
})

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;