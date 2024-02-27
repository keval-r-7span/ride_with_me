const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
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
    password: {
        type: String,
        required: true
    },
    Role:{
        type: String,
        enum: ["admin", "driver", "user"],
        default: "user"
    }

    // Other fields as needed, such as address, date of birth, etc.
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
  