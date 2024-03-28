import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        // unique: true,
    },
    phoneNumber: {
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
}, { timestamps: true });
export default mongoose.model("Customer", CustomerSchema);
