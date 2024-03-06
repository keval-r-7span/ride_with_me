const booking = require('../services/bookingService')

const viewBooking = async (req, res) => {
    try {
      const Booking = await booking.view_bookingall();
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
      const Booking = await booking.view_booking(req.params.id)
      if (!Booking) {
        return res.status(200).json({
          success: false,
          data: Booking,
          message: "no booking found for this user...",
        });
      }
      res.status(200).json({
        success: true,
        data: Booking
      });
    } catch (err) {
      return res.status(404).send("something wrong in view_booking... " + err);
    }
  };

const createBooking = async(req,res)=>{
    try {
        const response = await booking.create_booking(req.body);
        await response.save();
        return res.status(200).json({
            sucess:true,
            data:response,
            message:"Your Booking is done.."
        })
    } catch (error) {
        return res.status(500).json({
            sucess:false,
            message:"Error in create_booking "+ error
        })
    }
}

const updateBooking = async(req,res)=>{
    try{
      const response = await booking.update_booking(req.params.id,{
        $set:req.body},{new:true}
      )
      return res.status(200).json({
          sucess:true,
          data:response,
          message:"booking updated.."
      })
    }catch(error){
      return res.status(500).json({
        sucess:false,
        message:"Error in update_booking "+ error
    })
    }
}

const cancelBooking = async (req, res) => {
    try {
      const response = await booking.cancel_booking(req.params.id);
      if (!response) {
        return res.status(200).json({
          success: false,
          data: response,
          message: "no booking found this user..",
        });
      }
      res.status(204).json({
        success: true,
        data: response,
        message:"Your booking is cancel sucessfully.."
      });
    } catch (err) {
      return res.status(404).send("something wrong in cancel_booking... " + err);
    }
  };

  const changeRideStatus = async(req,res)=>{
    const { id } = req.params;
    try {
        const ridebooking = await booking.ride_complete(id);
        if (!ridebooking) {
            return res.status(404).json({sucess:false, message: 'Booking not found' });
        }
        ridebooking.status = 'completed';
        await ridebooking.save();
        res.json({sucess:true,
                 status:ridebooking.status,
                 message: 'Booking marked as completed' 
            });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
  module.exports = {
    viewBooking,
    viewBookingById,
    createBooking,
    cancelBooking,
    changeRideStatus,
    updateBooking
  }