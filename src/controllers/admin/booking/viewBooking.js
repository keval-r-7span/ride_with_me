const BookingSchema = require("../../../models/bookingModel");
const CustomerSchema = require("../../../models/customerModel");

// view-AllBooking
const View_BookingController = async (req, res) => {
  try {
    const Booking = await BookingSchema.find();
    if (!Booking) {
      return res.status(200).json({
        success: false,
        data: Booking,
        message: "not any booking found..",
      });
    }
    res.status(200).json({
      success: true,
      data: Booking,
      customer,
      message: "all avilable booking",
    });
  } catch (err) {
    return res.status(404).send("something wrong in view_booking... " + err);
  }
};

//view-Booking by userid
const View_BookingByIdController = async (req, res) => {
  try {
    const Booking = await BookingSchema.findById(req.params.id);
    const customer = await CustomerSchema.findById(Booking.customer);
    if (!Booking) {
      return res.status(200).json({
        success: false,
        data: Booking,
        message: "no booking found for this user...",
      });
    }
    res.status(200).json({
      success: true,
      data:{
        Booking:Booking._doc,
        customer
      }
    });
  } catch (err) {
    return res.status(404).send("something wrong in view_booking... " + err);
  }
};

module.exports = {
  View_BookingController,
  View_BookingByIdController,
};
