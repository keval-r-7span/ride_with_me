const jwt = require("jsonwebtoken");
const { JWT } = require("../helper/constants");

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.json({
        success: false,
        message: "Token Missing",
      });
    }
    try {
      //verify token
      const payload = jwt.verify(token, JWT.SECRET);
      console.log(payload);

      req.user = payload;
    } catch (error) {
      return res.json({
        success: false,
        message: "invalid Token " + error,
      });
    }
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "There was error in verification " + error,
    });
  }
};

exports.isDriver = (req, res, next) => {
  try {
    if (req.user.role !== "driver") {
      return res.json({
        success: false,
        message: "Proected route for driver only",
      });
    }
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong in student auth",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.json({
        success: false,
        message: "Proected route for admin only",
      });
    }
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong in student auth",
    });
  }
};

exports.isUser = (req, res, next) => {
  try {
    if (req.user.role !== "user") {
      return res.json({
        success: false,
        message: "Proected route for user only",
      });
    }
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong in student auth",
    });
  }
};
