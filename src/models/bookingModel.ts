import mongoose, { Schema, Document } from 'mongoose';

export interface Booking extends Document {
  customer: mongoose.Schema.Types.ObjectId;
  driver: mongoose.Schema.Types.ObjectId;
  pickupLocation: string;
  dropoffLocation:string;
  pickupTime:string;
  dropoffTime:string;
  fare: number;
  status: string;
  payment_status:string;
  comments:string;
}

const bookingSchema:Schema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    driver: {
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
      default:"pending"
    },
    fare: {
      type:Number,
    },
    payment_status: {
      type: String,
      enum: ["pending", "completed"],
      default:"pending"
    },
    rating: {
      type: Number,
    },
    comments: {
      type: String,
      default:"Good Experience"
    },
  },
  { timestamps: true }
);

export default mongoose.model<Booking>("Booking", bookingSchema);
