const Customer = require('../../models/customerModel.js')

const createCustomer = async (req, res) => {

    try {
        const response = await Customer.create(req.body)
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: "Something went wrong in CreateCustomer "+error,
        })
    }
}

module.exports = createCustomer;