const Customer = require('../../models/customerModel')

//View All Customer
const getCustomer = async (req, res) => {
    try {
        const response = await Customer.find()
        return res.status(200).json({
            success: true,
            data: response
        })    
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed due to some error in getCustomer"+error
        })
    }
}

//View customer by ID
const getCustomerByID = async (req, res) => {
    try {      
        const response = await Customer.findById(req.params.id)
        return res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        return res.status().json({
            success: false,
            message: "Something went wrong in finding by ID " +error
        })
    }
}



module.exports = {getCustomer, getCustomerByID};