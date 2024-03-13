const jwt = require("jsonwebtoken");
const role = require("../helper/role")
const { JWT } = require("../helper/constants");
const {trueResponse, falseResponse, falseResponseError } = require("../configs/responseMes");

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return falseResponse(res);
    }
    try {
      const decode = jwt.verify(token, JWT.SECRET, (err, decodeToken) => {
        if (err) {
          return falseResponseError(res, err);
        }
        if (!decodeToken.role) {
          return falseResponse(res)
        }
      });
      return trueResponse(res, decode)
    } catch (error) {
      return falseResponseError(res, error)
    }
    next();
  } catch (error) {
    return falseResponseError(res, error)
  }
};

exports.isDriver = (req, res, next) => {
  try {
    if (req.user.role !== "driver") {
      return falseResponse(res);
    }
    next();
  } catch (error) {
    return falseResponseError(res, error);
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return falseResponse(res)
    }
    next();
  } catch (error) {
    return falseResponseError(res, error)
  }
};

exports.isUser = (req, res, next) => {
  try {
    if (req.user.role !== "user") {
      return falseResponse(res)
    }
    next();
  } catch (error) {
    return falseResponseError(res, error)
  }
};
