const BookingSchema = require("../../../models/bookingModel");

const rideBooking_Complete = async(req,res)=>{
    const { id } = req.params;
    try {
        const ridebooking = await BookingSchema.findById(id);
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
module.exports = rideBooking_Complete;