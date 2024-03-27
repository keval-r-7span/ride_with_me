import { ObjectId, QueryOptions, UpdateQuery } from 'mongoose';
import BookingSchema,{Booking} from '../models/bookingModel';

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

export const viewBookingFilter = async (query:any) => {
  try {
    return await BookingSchema.find(query)
      .sort({ createdAt: -1 })
  } catch (error) {
    throw error;
  }
};

const createBooking = async (query:string) => {
  try {
    return await BookingSchema.create(query);
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const updateBooking = async (id:string, query:UpdateQuery<Booking>, option:QueryOptions<Booking>) => {
  try {
    return await BookingSchema.findByIdAndUpdate(id, query, option);
  } catch (error) {
    throw error;
  }
};


export const cancelBooking = async (query:string)=> {
  try {
    return await BookingSchema.findByIdAndDelete(query);
  } catch (error) {
    console.log(error);
  }
};

export const rideComplete = async (query:string) => {
  try {
    return await BookingSchema.findById(query);
  } catch (error) {
    console.log(error);    
  }
};

export const getRevenue = async () => {
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

export const aggregateBookings = async () => {
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

export const bookingService =  {createBooking,viewBookingAll,viewBookingFilter,viewBooking,updateBooking,cancelBooking,rideComplete,getRevenue,aggregateBookings}
