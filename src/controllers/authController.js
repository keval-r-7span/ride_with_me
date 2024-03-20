const customerService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwtToken = require("../validator/jwtToken");
const { trueResponse, falseResponse, falseResponseError } = require("../configs/responseMes");
const mailForBooking = require("../helper/sendMail");
const crypto = require("crypto");

const signUp = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;
    const userExist = await customerService.findCustomer({ email });
    console.log(userExist);
    if (userExist) {
      throw new Error("User Already exist with same Email: " + { email });
    }
    if (role !== "admin") {
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await customerService.registerUser({
        name,
        email: email.toLowerCase(),
        phoneNumber,
        password: hashedPassword,
        role,
      });
      await response.save();
      return trueResponse(res, response);
    } else {
      return falseResponse(res)
    }
  } catch (error) {
    return falseResponseError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return falseResponse(res);
    }
    let registeredUser = await customerService.findCustomer({ phoneNumber });
    if (!registeredUser) {
      return falseResponse(res);
    } else {
      const ismatch = bcrypt.compare(password, registeredUser.password);
      if (ismatch) {
        const token = jwtToken.generateAccessToken(registeredUser);
        console.log(registeredUser);
        registeredUser.token = token;
        res.cookie("token", token, { httpOnly: true }).json({
          success: true,
          registeredUser,
          message: "User Logged in successfully",
        });
      } else {
        return falseResponse(res);
      }
    }
  } catch (error) {
    return falseResponseError(res, error);
  }
};

const resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await customerService.findCustomer({ email });
    if (!user) {
      return falseResponse(res)
    }
    const token = crypto.randomUUID();
    const response = await customerService.updateSingle(
      { email },
      { token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    const url = `http://localhost:4000/update-password/${token}`;
    console.log(url);
    await mailForBooking(email, "URL SENDING ", `link : ${url}`);
    return trueResponse(res, response)
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    const userDetails = await customerService.findCustomer({ token });
    if (!userDetails) {
      return falseResponse(res)
    }
    if (userDetails.resetPasswordExpires < Date.now) {
      return falseResponse(res)
    }
    const encryptPassword = await bcrypt.hash(password, 10);
    const response = await customerService.updateSingle(
      { token },
      { password: encryptPassword },
      { new: true }
    );
    return trueResponse(res, response)
  } catch (error) {
    return falseResponseError(res, error)
  }
};

module.exports = {
  signUp,
  login,
  resetPasswordToken,
  resetPassword,
};
