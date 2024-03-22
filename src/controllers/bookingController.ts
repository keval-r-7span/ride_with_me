import { Request,Response } from 'express';
import { bookingService } from '../services/bookingService';

const viewBooking = async (req:Request, res:Response)=> {
  try {
    const response = await bookingService.viewBookingAll()
    if (!response) {
      res.json({sucess:false,data:"NO DATA"})
    }
    return res.status(200).json({sucess:true,data:response})
  } catch (error) {
    console.log(error);
    return res.json({sucess:false,data:"ERROR"})
  }
};

// const viewBookingById = async (req, res) => {
//   try {
//     const response = await bookingService.viewBooking(req.params.id);
//     if (!response) {
//       return falseResponse(res, "NOT FOUND USER");
//     }
//     return trueResponse(res, response);
//   } catch (error) {
//     return falseResponse(res, error);
//   }
// };

// const BookingStatus = async (req, res) => {
//   try {
//     const status = req.body.status || req.query.status;
//     const response = await bookingService.viewBookingFilter({ status });
//     return trueResponse(res, response);
//   } catch (error) {
//     return falseResponse(res, error);
//   }
// };

const createBooking = async (req:Request, res:Response) => {
  try {
    const response = await bookingService.createBooking(req.body);
    // mailForBooking(response);
    await response.save();
    return res.status(200).json({sucess:true,data:response})
  } catch (error) {
    return res.status(200).json({sucess:false,message:error});
  }
};

const updateBooking = async (req:any, res:any) => {
  try {
    const response = await bookingService.updateBooking(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!response) {
      return res.status(200).json({sucess:false,message:"NO DATA CHANGE"});
    }
    return res.status(200).json({sucess:true,data:response,message:"NO DATA CHANGE"});
  } catch (error) {
    return res.status(200).json({sucess:false,message:error});
  }
};

// const cancelBooking = async (req:Request, res:Response) => {
//   try {
//     const response = await bookingService.cancelBooking(req.params.id);
//     if (!response) {
//       return res.status(200).json({sucess:false,message:"NO CANCEL ANY BOOKING"});
//     }
//     return res.status(200).json({sucess:true,data:response,message:"Booking Cancel Suceesfully."});
//   } catch (error) {
//     return res.status(404).json({sucess:false,message:error});
//   }
// };

// const changeRideStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const ridebooking = await bookingService.rideComplete(id);
//     if (!ridebooking) {
//       return falseResponse(res, "NOT FOUND");
//     }
//     ridebooking.status = "completed";
//     await ridebooking.save();
//     return trueResponse(res, ridebooking);
//   } catch (error) {
//     return falseResponse(res, error);
//   }
// };

// const paymentStatus = async (req, res) => {
//   try {
//     const ridebooking = await bookingService.rideComplete(req.params.id);
//     if (!ridebooking) {
//       return falseResponse(res, "NOT FOUND");
//     }
//     ridebooking.payment_status = "completed";
//     await ridebooking.save();
//     return trueResponse(res, ridebooking);
//   } catch (error) {
//     return falseResponse(res, error);
//   }
// };

// const getRevenue = async (req, res) => {
//   try {
//     const response = await bookingService.getRevenue();
//     return trueResponse(res, response);
//   } catch (error) {
//     return falseResponse(res, error);
//   }
// };

// const totalBooking = async (req, res) => {
//   try {
//     const response = await bookingService.aggregateBookings();
//     return trueResponse(res, response);
//   } catch (error) {
//     return falseResponse(res, error);
//   }
// };


export {viewBooking,createBooking,updateBooking}
