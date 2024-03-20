const { TWILIO } = require("../helper/constants");
const client = require("twilio")(TWILIO.ACCOUNT_SID, TWILIO.AUTH_TOKEN);
const { trueResponse, falseResponseError } = require("../configs/responseMes");

const sendOtp = async (req, res, next) => {
  const { phoneNumber } = req.body;
  try {
    const response = await client.verify.v2
      .services(TWILIO.SERVICE_SID)
      .verifications.create({
        to: `+91${phoneNumber}`,
        channel: "sms",
      });
    return trueResponse(res, response);
  } catch (error) {
    return falseResponseError(res, error);
  }
};
const verifyOtp = async (req, res, next) => {
  const { phoneNumber, otp } = req.body;
  try {
    const response = await client.verify.v2
      .services(TWILIO.SERVICE_SID)
      .verificationChecks.create({
        to: `+91${phoneNumber}`,
        code: otp,
      });
    return trueResponse(res, response);
  } catch (error) {
    return falseResponseError(res, error);
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
};
