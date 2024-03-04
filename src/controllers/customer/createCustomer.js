const Customer = require('../../models/customerModel.js')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()


const createCustomer = async (req, res) => {

    try {

        const { Name, email, phoneNumber, password, Role } = req.body
        const userExist = await Customer.findOne({ email })
        if (userExist) {
            throw new Error("User Already exist with same Email: " + { email });
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        const response = await Customer.create({
            Name,
            email: email.toLowerCase(),
            phoneNumber,
            password: hashedPassword,
            Role
        })

        const payload = {
            Name: response.Name,
            email: response.email,
            Role: response.Role
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

const loginCustomer = async (req, res) => {
    try {
        //Data Fetch 
        const {email, password} = req.body
        
        //validation on email and password if not validated throw error 
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

        // const payload = {
        //     name: registeredUser.Name,
        //     email: registeredUser.email,
        //     role: registeredUser.Role,
        //     password: undefined
        // }
        
        //verify password and genereate jwt token
        if(await bcrypt.compare(password, registeredUser.password)){

            //Login if password match 
            let token = jwt.verify(registeredUser.token, process.env.JWT_SECRET, {
                expiresIn: "48h"
            })

            // registeredUser = registeredUser.toObject()
            // registeredUser.token = token;
            // await registeredUser.save()

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