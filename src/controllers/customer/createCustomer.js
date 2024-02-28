const Customer = require('../../models/customerModel.js')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()


const createCustomer = async (req, res) => {

    try {

        //get Data 
        const { Name, email, phoneNumber, password, Role } = req.body
        
        //Check if user already exist
        const userExist = await Customer.findOne({ email })
        
        //Throwing error for userExisting with same email
        if (userExist) {
            throw new Error("User Already exist with same Email: " + { email });
        }

        //Secure password
        let hashedPassword = await bcrypt.hash(password, 10);


        //create User 
        const response = await Customer.create({
            Name,
            email: email.toLowerCase(),
            phoneNumber,
            password: hashedPassword,
            Role
        })

        //Creating Payload
        const payload = {
            Name: response.Name,
            email: response.email
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
            message: "User created successfully",
            data: response
        })
        

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in CreateCustomer " + error,
        })
    }
}

module.exports = createCustomer;