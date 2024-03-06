const customerService = require('../service/userService')


//View All Customer
const getCustomer = async (req, res) => {
    try {
        const response = await customerService.viewCustomer();
        return res.status(200).json({
            success: true,
            data: response,
            message: "Successfully Fetched all customer"
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
        const response = await customerService.viewCustomerById(req.params.id)
        return res.status(200).json({
            success: true,
            data: response,
            message: "Successfully found"
        })
    } catch (error) {
        return res.status().json({
            success: false,
            message: "Something went wrong in finding by ID " +error
        })
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const response = await customerService.deleteCustomer(req.params.id)
        return res.status(200).json({
            success: true,
            data: response,
            message: "User deleted successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in deletebyID "+error
        })
    }
}

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, phoneNumber, role } = req.body
        const response = await customerService.updateCustomer(
            {_id: id}, 
            {name, email, phoneNumber, role},
            {new:true }
        )
        return res.status(200).json({
            success: true,
            data: response,
            message: "updated Successfully"
        })      
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot find ID to update"+error
        })
    }
}

module.exports = {
    deleteCustomer, 
    updateCustomer, 
    getCustomer, 
    getCustomerByID};