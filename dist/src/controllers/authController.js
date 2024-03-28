var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { customerService } from "../services/userService";
import bcrypt from "bcryptjs";
import jwtToken from "../validation/jwtToken";
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phoneNumber, password, role } = req.body;
        const userExist = yield customerService.findCustomer({ email });
        if (userExist) {
            throw new Error("User Already exist with same Email: " + { email });
        }
        if (role !== "admin") {
            const hashedPassword = yield bcrypt.hash(password, 10);
            const response = yield customerService.registerUser({
                name,
                email: email.toLowerCase(),
                phoneNumber,
                password: hashedPassword,
                role,
            });
            if (!response) {
                throw new Error("Failed to register");
            }
            yield response.save();
            return res.status(200).json({ sucess: true, data: response });
        }
        else {
            return res.json({ sucess: false, data: "ERROR" });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ sucess: false, data: "ERROR" });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber, password } = req.body;
        if (!phoneNumber || !password) {
            return res.json({ sucess: false, data: "ERROR" });
        }
        let registeredUser = yield customerService.findCustomer({ phoneNumber });
        if (!registeredUser) {
            return res.json({ sucess: false, data: "ERROR" });
        }
        else {
            const ismatch = yield bcrypt.compare(password, registeredUser.password);
            if (ismatch) {
                const token = jwtToken(registeredUser);
                registeredUser.token = token;
                res.cookie("token", token, { httpOnly: true }).json({
                    success: true,
                    registeredUser,
                    message: "User Logged in successfully",
                });
            }
            else {
                return res.json({ sucess: false, data: "ERROR" });
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ sucess: false, data: "ERROR" });
    }
});
//   const resetPasswordToken = async (req: Request, res: Response) => {
//     try {
//       const { email } = req.body;
//       const user = await customerService.findCustomer({ email });
//       if (!user) {
//         return res.json({ sucess: false, data: "ERROR" });
//       }
//       const token = crypto.randomUUID();
//       const response = await customerService.updateSingle(
//         { email:string },
//         { token:string, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
//         { new: true }
//       );
//       const url = `http://localhost:4000/update-password/${token}`;
//       console.log(url);
//     //   await mailForBooking(email, "URL SENDING ", `link : ${url}`);
//       return res.status(200).json({ sucess: true, data: response });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const resetPassword = async (req: Request, res: Response) => {
//     try {
//       const { password, token } = req.body;
//       const userDetails = await customerService.findCustomer({ token });
//       if (!userDetails) {
//         return res.json({ sucess: false, data: "ERROR" });
//       }
//       if (userDetails.resetPasswordExpires < Date.now) {
//         return res.json({ sucess: false, data: "ERROR" });
//       }
//       const encryptPassword = await bcrypt.hash(password, 10);
//       const response = await customerService.updateSingle(
//         { token },
//         { password: encryptPassword },
//         { new: true }
//       );
//       return res.status(200).json({ sucess: true, data: response });
//     } catch (error) {
//         console.log(error);
//         return res.json({ sucess: false, data: "ERROR" });
//     }
//   };
export { signUp, login };
