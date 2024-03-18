const mongoose = require("mongoose");
const crypto = require("crypto");

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
    }
    // token: {
    //   type: String,
    // },
    // passwordResetToken: {
    //   type: String,
    // },
    // passwordResetTokenExpires: {
    //   type: Date,
    // },
    //location
    //profile
  },
  { timestamps: true }
);

// CustomerSchema.method.createPasswordToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//   this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

//   console.log(resetToken, this.passwordResetToken);
//   return resetToken;
// };

module.exports = mongoose.model("Customer", CustomerSchema);
