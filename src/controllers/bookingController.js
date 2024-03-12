const mailForBooking = require("../helper/sendMail");
const booking = require("../services/bookingService");
const bookingJoiSchema = require('../validation/bookingValidation')
const CustomerSchema = require('../models/customerModel')
const BookingSchema = require('../models/bookingModel')

const viewBooking = async (req, res) => {
  try {
    const Booking = await booking.viewBookingAll();
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
      message: "all avilable booking",
    });
  } catch (err) {
    return res.status(404).send("something wrong in view_booking... " + err);
  }
};

const viewBookingById = async (req, res) => {
  try {
    const Booking = await booking.viewBooking(req.params.id);
    if (!Booking) {
      return res.status(200).json({
        success: false,
        data: Booking,
        message: "no booking found for this user...",
      });
    }
    res.status(200).json({
      success: true,
      data: Booking,
    });
  } catch (err) {
    return res.status(404).send("something wrong in view_booking... " + err);
  }
};

const BookingStatus = async (req, res) => {
  try {
    const status = req.body.status || req.query.status;
    const Booking = await booking.viewBookingFilter({ status });
    res.status(200).json({
      success: true,
      data: Booking,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "something wrong in Booking_status... " + error });
  }
};

const createBooking = async (req, res) => {
  try {
    const {error} = bookingJoiSchema.validate(req.body)
    if(error){
      return res.status(400).json({sucess:false, message: error.details[0].message });
    }else{
      const response = await booking.createBooking(req.body);
      // send mail
      // mailForBooking(response);
      await response.save()
      return res.status(200).json({
        sucess: true,
        data: response,
        message: "Your Booking is done..",
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error in create_booking " + error,
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const response = await booking.updateBooking(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({
      sucess: true,
      data: response,
      message: "booking updated..",
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error in update_booking " + error,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const response = await booking.cancelBooking(req.params.id);
    if (!response) {
      return res.status(200).json({
        success: false,
        message: "no booking found this user..",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Your booking is cancel sucessfully..",
    });
  } catch (err) {
    return res
      .status(404)
      .json({ message: "something wrong in cancel_booking... " + err });
  }
};

const changeRideStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const ridebooking = await booking.rideComplete(id);
    if (!ridebooking) {
      return res
        .status(404)
        .json({ sucess: false, message: "Booking not found" });
    }
    ridebooking.status = "completed";
    await ridebooking.save();
    res.json({
      sucess: true,
      status: ridebooking.status,
      message: "Booking marked as completed",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const paymentStatus = async (req, res) => {
  try {
    const ridebooking = await booking.rideComplete(req.params.id);
    if (!ridebooking) {
      return res
        .status(404)
        .json({ sucess: false, message: "Payment not completed" });
    }
    ridebooking.payment_status = "completed";
    await ridebooking.save();
    res.json({
      sucess: true,
      status: ridebooking.payment_status,
      message: "payment status marked as completed",
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  viewBooking,
  viewBookingById,
  createBooking,
  cancelBooking,
  changeRideStatus,
  updateBooking,
  BookingStatus,
  paymentStatus,
};
