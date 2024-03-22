// const { log } = require("winston");
// const logger = require('../utils/logger')
import { ObjectId } from 'mongoose';
import BookingSchema from '../models/bookingModel';

const viewBookingAll = async ()=> {
  try {
     return await BookingSchema.find()
    //   .populate("customer")
    //   .populate("driver")
  } catch (error) {
    throw error;
  }
};

 const viewBooking = async (query:string) => {
  try {
    return await BookingSchema.findById(query)
      .sort({ createdAt: -1 })
  } catch (error) {
    throw error;
  }
};

// export const viewBookingFilter = async (query:string) => {
//   try {
//     return await BookingSchema.find(query)
//       .sort({ createdAt: -1 })
//       .populate("customer")
//       .populate("driver")
//       .exec();
//   } catch (error) {
//     throw error;
//   }
// };

const createBooking = async (query:object) => {
  try {
    return await BookingSchema.create(query);
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const updateBooking = async (id:ObjectId, query:any, option:any) => {
  try {
    return await BookingSchema.findByIdAndUpdate(id, query, option);
  } catch (error) {
    throw error;
  }
};

// exports.cancelBooking = async (query) => {
//   try {
//     return await BookingSchema.findByIdAndDelete(query);
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.rideComplete = async (query) => {
//   try {
//     return await BookingSchema.findById(query);
//   } catch (error) {
//     logger.error(error);
//   }
// };

// exports.getRevenue = async () => {
//   try {
//     const monthlyRevenue = await BookingSchema.aggregate([
//       {
//         $group: {
//           _id: {
//             year: { $year: "$pickupTime" },
//             month: { $month: "$pickupTime" },
//           },
//           totalRevenue: { $sum: "$fare" },
//         },
//       },
//       {
//         $sort: { "_id.year": 1, "_id.month": 1 },
//       },
//     ]);
//     return monthlyRevenue;
//   } catch (error) {
//     console.log("ERROR in Aggregation " + error);
//   }
// };

// exports.aggregateBookings = async () => {
//   try {
//     const result = await BookingSchema.aggregate([
//       {
//         $group: {
//           _id: {
//             day: { $dayOfMonth: "$createdAt" },
//             week: { $week: "$createdAt" },
//             month: { $month: "$createdAt" },
//             year: { $year: "$createdAt" },
//           },
//           totalBookings: { $sum: 1 },
//         },
//       },
//     ]);
//     return result;
//   } catch (error) {
//     console.log("ERROR in Aggregation " + error);
//   }
// };

export const bookingService =  {createBooking,viewBookingAll,viewBooking,updateBooking}
