const BookingSchema = require("../../../models/bookingModel");

// view-AllBooking
const View_BookingController = async (req, res) => {
  try {
    const response = await BookingSchema.find();
    if (!response) {
      return res.status(200).json({
        success: false,
        data: response,
        message: "not any booking found..",
      });
    }
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    return res.status(404).send("something wrong in view_booking... " + err);
  }
};

//view-Booking by userid
const View_BookingByIdController = async (req, res) => {
    try {
      const response = await BookingSchema.findById(req.params.id);
      if (!response) {
        return res.status(200).json({
          success: false,
          data: response,
          message: "no booking found for this user",
        });
      }
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (err) {
      return res.status(404).send("something wrong in view_booking... " + err);
    }
  };

module.exports = {
                 View_BookingController,
                 View_BookingByIdController          
            };

