const jwt = require("jsonwebtoken");
const { JWT } = require("../helper/constants");

exports.generateAccessToken = (user) => {
  const payload = {
    _id:  user._id,
    phoneNumber: user.phoneNumber,
    email: user.email,
    role: user.role,
  };
  const options = { expiresIn: JWT.EXPIRES };
  return jwt.sign(payload, JWT.SECRET, options);
};
