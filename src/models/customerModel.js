const mongoose = require("mongoose");
// const crypto = require("crypto");

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      // unique: true,
    },
    phoneNumber: {
      type: String,
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "driver", "user"],
      default: "user",
    },
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    //penalty
    // profile-->gender,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
