const customerService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwtToken = require("../validator/jwtToken");
const { JWT } = require("../helper/constants");

const signUp = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;
    const userExist = await customerService.findCustomer({ email });
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
      return res.status(200).json({
        success: true,
        message: "User created successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Enter valid role",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in signUp " + error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res.status(500).json({
        success: false,
        message: "Please enter proper info! ",
      });
    }
    let registeredUser = await customerService.findCustomer({ phoneNumber });
    if (!registeredUser) {
      return res.json({
        success: false,
        message: "Please Register First",
      });
    } else {
      const ismatch = bcrypt.compare(password, registeredUser.password);
      if (ismatch) {
        const token = jwtToken.generateAccessToken(registeredUser);
        registeredUser.token = token;
        res.cookie("token", token, { httpOnly: true }).json({
          success: true,
          registeredUser,
          message: "User Logged in successfully",
        });
      } else {
        return res.json({
          success: false,
          message: "invalid user during token assigning",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in login " + error,
    });
  }
};

module.exports = {
  signUp,
  login,
};
