const BookingSchema = require("../../../models/bookingModel");

// view-AllBooking
const View_BookingController = async (req, res) => {
  try {
    const response = await BookingSchema.find();
    if (!response) {
      res.status(200).json({
        success: false,
        data: response,
        message: "Not any booking found..",
      });
    }
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    res.status(404).send("something wrong in view_booking " + err);
  }
};

module.exports = View_BookingController;
