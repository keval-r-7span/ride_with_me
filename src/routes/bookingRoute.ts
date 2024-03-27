import { Router } from 'express';
const router = Router()

import {
 viewBooking,createBooking,updateBooking,cancelBooking
} from '../controllers/bookingController';

router.get("/all", viewBooking);
// router.get("/status", BookingStatus);
// router.get("/:id", viewBookingById);
// router.get("/revenue/total", getRevenue);
// router.get("/monthly/total",totalBooking)
router.post("/create", createBooking);
// router.post("/:id/completed", changeRideStatus);
router.put("/update/:id", updateBooking);
// router.post("/payment/status/:id", paymentStatus);
router.delete("/cancel/:id", cancelBooking);

export default router
