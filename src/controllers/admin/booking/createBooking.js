const BookingSchema = require("../../../models/bookingModel");

const create_BookingController = async(req,res)=>{

    try {
        const response = await BookingSchema.create(req.body);
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

module.exports = create_BookingController;
