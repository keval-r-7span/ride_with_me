const customerService = require('../service/userService')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {JWT} = require('../helper/constants')

const registerCustomer = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, role } = req.body //getData
        const userExist = await customerService.findCustomer({ email }) //Check if user already exist
        if (userExist) //Throwing error for userExisting with same email
        {
            throw new Error("User Already exist with same Email: " + { email });
        }
        let hashedPassword = await bcrypt.hash(password, 10); //Secure password 
        //create User
        const response = await customerService.registerUser({
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
            expiresIn: JWT.EXPIRES
        })
        response.token = token; //assigning a token to new user in response
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
        const {phoneNumber, password} = req.body
        //validation on email and password if not validated throw error 
        if(!phoneNumber || !password){
            return res.status(500).json({
                success: false,
                message: "Please enter proper info! "
            })
        }
        //check for registered user
        let registeredUser = await customerService.findCustomer({phoneNumber})
        if(!registeredUser){
            return res.json({
                success: false,
                message: "Please Register First"
            })
        }
        // const payload = {
        //     name: registeredUser.name,
        //     email: registeredUser.email,
        //     role: registeredUser.role,
        //     password: undefined
        // }      
        //verify password and genereate jwt token
        if(await bcrypt.compare(password, registeredUser.password)){
            //Login if password match 
            let token = jwt.verify(registeredUser.token, JWT.SECRET, {
                expiresIn: JWT.EXPIRES
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

module.exports = {
    registerCustomer,
    loginCustomer
}