const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    // location
    //
    role: {
      type: String,
      enum: ["admin", "driver", "user"],
      default: "user",
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports =  mongoose.model("Customer", CustomerSchema)
