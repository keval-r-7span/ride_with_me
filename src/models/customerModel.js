const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["admin", "driver", "user"],
        default: "user"
    },
    token: {
        type: String,
    },
    // Other fields as needed, such as address, date of birth, etc.
}, { timestamps: true });


module.exports = mongoose.model('Customer', CustomerSchema);
  