const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    // required: true,
    // unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    // unique: true
  },
  vehicle: {
    type: String,
    required: true
  },
  vehicleDetails: {
    model: { type: String },
    year: { type: Number },
    licensePlate: { type: String }
  },
  availabilityStatus: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'unavailable'
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: [
      { type: Number }
    ]
  },
  password: {
    type: String,
    required: true
  }
});

// // Hash password before saving driver
// driverSchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(this.password, saltRounds);
//     this.password = hashedPassword;
//   }
//   next(); // Proceed with saving the driver
// });

module.exports = mongoose.model('Driver', driverSchema);
