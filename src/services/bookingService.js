const BookingSchema = require("../models/bookingModel");

exports.view_bookingall = async () => {
  try {
    return await BookingSchema.find();
  } catch (error) {
    throw error;
  }
};

exports.view_booking = async (query) => {
  try {
    return await BookingSchema.findById(query);
  } catch (error) {
    throw error;
  }
};

exports.create_booking = async (query) => {
  try {
    return await BookingSchema.create(query);
  } catch (error) {
    throw error;
  }
};

exports.update_booking = async(id,query,option)=>{
  try {
    return await BookingSchema.findByIdAndUpdate(id,query,option)
  } catch (error) {
    throw error
  }
}


exports.cancel_booking = async (query) => {
  try {
    return await BookingSchema.findByIdAndDelete(query);
  } catch (error) {
    throw error;
  }
};

exports.ride_complete = async (query) => {
  try {
    return await BookingSchema.findById(query);
  } catch (error) {
    throw error;
  }
};
