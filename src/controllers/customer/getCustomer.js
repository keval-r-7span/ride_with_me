const Customer = require('../../models/customerModel')

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
            message:"Failed due to some error"
        })
    }
}


module.exports = getCustomer;