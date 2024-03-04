const Customer = require('../../models/customerModel.js')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const createCustomer = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, role } = req.body
        const userExist = await Customer.findOne({ email })
        if (userExist) {
            throw new Error("User Already exist with same Email: " + { email });
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        const response = await Customer.create({
            name,
            email: email.toLowerCase(),
            phoneNumber,
            password: hashedPassword,
            role
        })
        const payload = {
            name: response.name,
            email: response.email,
            role: response.role
        }
        //Creating JWT token
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn: "168h"
        })
        //assigning a token to new user in response
        response.token = token;
        await response.save();
        return res.status(200).json({
            success: true,
            data: response,
            message: "User created successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in CreateCustomer " + error,
        })
    }
}

const loginCustomer = async (req, res) => {
    try {
        //Data Fetch 
        const {email, password} = req.body
        if(!email || !password){
            return res.status(500).json({
                // success: false,
                message: "Please register"
            })
        }
        //check for registered user
        let registeredUser = await Customer.findOne({email})
        if(!registeredUser){
            return res.json({
                success: false,
                message: "Please Register First"
            })
        }
        
        //verify password and genereate jwt token
        if(await bcrypt.compare(password, registeredUser.password)){
            let token = jwt.verify(registeredUser.token, process.env.JWT_SECRET, {
                expiresIn: "48h"
            })
            const options = {
                    expires: new  Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true
            }

            return res.cookie("token", token ,options).status(200).json({
                success: true,
                data:registeredUser, 
                message:"sucessfuly logged in"
            })

        }
    } catch (error) {
         res.status(500).json({
            success: false,
            message: "Error in login " +error
        })
    }
}







module.exports = {createCustomer, loginCustomer};