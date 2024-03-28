var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TWILIO } from "../helper/constants";
import twilio from "twilio";
const client = twilio(TWILIO.ACCOUNT_SID, TWILIO.AUTH_TOKEN);
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = req.body;
    try {
        const response = yield client.verify.v2
            .services(TWILIO.SERVICE_SID)
            .verifications.create({
            to: `+91${phoneNumber}`,
            channel: "sms",
        });
        return res.status(200).json({ sucess: true, data: response });
    }
    catch (error) {
        console.log(error);
        return res.json({ sucess: false, data: "ERROR" });
    }
});
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, otp } = req.body;
    try {
        const response = yield client.verify.v2
            .services(TWILIO.SERVICE_SID)
            .verificationChecks.create({
            to: `+91${phoneNumber}`,
            code: otp,
        });
        console.log(response);
        return res.status(200).json({ sucess: true, data: response });
    }
    catch (error) {
        console.log(error);
        return res.json({ sucess: false, data: "ERROR" });
    }
});
export { sendOtp, verifyOtp };
