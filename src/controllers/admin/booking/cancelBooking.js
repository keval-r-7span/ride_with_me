
const BookingSchema = require("../../../models/bookingModel");

// cancel-Booking

const cancel_BookingController = async (req, res) => {
  try {
    const response = await BookingSchema.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(200).json({
        success: false,
        data: response,
        message: "no booking found this user..",
      });
    }
    res.status(200).json({
      success: true,
      data: response,
      message:"Your booking is cancel sucessfully.."
    });
  } catch (err) {
    return res.status(404).send("something wrong in cancel_booking... " + err);
  }
};




module.exports = cancel_BookingController