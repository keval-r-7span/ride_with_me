const { TWILIO } = require("../helper/constants");
const client = require("twilio")(TWILIO.ACCOUNT_SID, TWILIO.AUTH_TOKEN);

const sendOTP = async (req, res, next) => {
  const { countryCode, phoneNumber } = req.body;
  try {
    const otpResponse = await client.verify.v2
      .services(TWILIO.SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: "sms",
      });
    res.send(`OTP SENT ${JSON.stringify(otpResponse)}`);
  } catch (error) {
    res.send(`Error occusred at sending otp ${error}`);
  }
};
const verifyOtp = async (req, res, next) => {
  const { countryCode, phoneNumber, otp } = req.body;
  try {
    const verifiedResponse = await client.verify.v2
      .services(TWILIO.SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode}${phoneNumber}`,
        code: otp,
      });
    res.send(`OTP VERIFIED SUCCESSFULLY: ${JSON.stringify(verifiedResponse)}`);
  } catch (error) {
    res.send(`Error occusred at verifyng otp ${error}`);
  }
};

module.exports = {
  sendOTP,
  verifyOtp,
};
