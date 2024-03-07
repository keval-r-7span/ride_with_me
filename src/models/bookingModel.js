const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: false,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    dropoffLocation: {
      type: String,
      required: true,
    },
    pickupTime: {
      type: Date,
      required: true,
    },
    dropoffTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
      default: "pending",
    },
    fare: {
      type: Number,
    },
    payment_status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    rating: {
      type: Number,
    },
    comments: {
      type: String,
      defualt: "safe journey",
    },
  },
  { timestamps: true}
);


module.exports = mongoose.model("Booking", bookingSchema);;
