const { log } = require("winston");
const logger = require("../helper/logger");
const BookingSchema = require("../models/bookingModel");

exports.viewBookingAll = async () => {
  try {
    return await BookingSchema.find()
      .sort({ createdAt: -1 })
      .populate("customer")
      .populate("driver")
      .exec();
  } catch (error) {
    throw error;
  }
};

exports.viewBooking = async (query) => {
  try {
    return await BookingSchema.findById(query)
      .sort({ createdAt: -1 })
      .populate("customer")
      .populate("driver")
      .exec();
  } catch (error) {
    throw error;
  }
};
exports.viewBookingFilter = async (query) => {
  try {
    return await BookingSchema.find(query)
      .sort({ createdAt: -1 })
      .populate("customer")
      .populate("driver")
      .exec();
  } catch (error) {
    throw error;
  }
};

exports.createBooking = async (query) => {
  try {
    return await BookingSchema.create(query);
  } catch (error) {
    throw error;
  }
};

exports.updateBooking = async (id, query, option) => {
  try {
    return await BookingSchema.findByIdAndUpdate(id, query, option);
  } catch (error) {
    throw error;
  }
};

exports.cancelBooking = async (query) => {
  try {
    return await BookingSchema.findByIdAndDelete(query);
  } catch (error) {
    throw error;
  }
};

exports.rideComplete = async (query) => {
  try {
    return await BookingSchema.findById(query);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

exports.getRevenue = async () => {
  try {
    const monthlyRevenue = await BookingSchema.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$pickupTime" },
            month: { $month: "$pickupTime" },
          },
          totalRevenue: { $sum: "$fare" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    return monthlyRevenue;
  } catch (error) {
    console.log("ERROR in Aggregation " + error);
  }
};

exports.aggregateBookings = async () => {
  try {
    const result = await BookingSchema.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            week: { $week: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalBookings: { $sum: 1 },
        },
      },
    ]);
    return result;
  } catch (error) {
    console.log("ERROR in Aggregation " + error);
  }
};
