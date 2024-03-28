import jwt from "jsonwebtoken";
import { JWT } from "../helper/constants";
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || req.headers["Authorization"];
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token) {
            return res.json({ success: false, data: "error" });
        }
        try {
            const decode = jwt.verify(token, JWT.SECRET);
            if (!decode.role) {
                return res.json({ success: false, data: "error" });
            }
            req.user = decode;
            next();
        }
        catch (error) {
            console.log(error);
            return res.json({ success: false, data: "error" });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, data: "error" });
    }
};
const isDriver = (req, res, next) => {
    try {
        if (req.user.role !== "driver") {
            return res.json({ success: false, data: "error" });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, data: "error" });
    }
};
const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.json({ success: false, data: "error" });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, data: "error" });
    }
};
const isUser = (req, res, next) => {
    try {
        if (req.user.role !== "user") {
            return res.json({ success: false, data: "error" });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, data: "error" });
    }
};
export { verifyToken, isUser, isDriver, isAdmin };
