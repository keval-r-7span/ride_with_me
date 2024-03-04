const BookingSchema = require("../../../models/bookingModel");

const booking_Complete = async(req,res)=>{
    const { id } = req.params;
    try {
        const booking = await BookingSchema.findById(id);
        if (!booking) {
            return res.status(404).json({sucess:false, message: 'Booking not found' });
        }
        booking.status = 'completed';
        await booking.save();

        res.json({ message: 'Booking marked as completed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = booking_Complete;