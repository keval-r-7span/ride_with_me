const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    pickupLocation: {
      type: String,
    },
    dropoffLocation: {
      type: String,
    },
    pickupTime: {
      type: Date,
    },
    dropoffTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    },
    fare: {
      type: Number,
    },
    payment_status: {
      type: String,
      enum: ["pending", "completed"],
    },
    rating: {
      type: Number,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
