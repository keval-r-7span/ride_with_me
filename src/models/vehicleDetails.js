const mongoose = require("mongoose");

const vehicleDetails = new mongoose.Schema({
  manufacturer: {
    type: String, // Tata, Hyundai, Maruti, Mahindra, Toyota
  },
  model: {
    type: String,
  },
  year: {
    type: Number,
  },
  licensePlate: {
    type: String,
  },
  color: {
    type: String,
  },
  vehicleClass: {
    type: String,
    enum: ["Bike", "Rickshaw", "Hatchback", "Sedan", "Suv", "VIP"],
  },
  baseFare: {
    type: Number,
  },
  driverId: {
    type: mongoose.Types.ObjectId,
    ref: "Driver",
  }
});

module.exports = mongoose.model("Vehicle", vehicleDetails);
