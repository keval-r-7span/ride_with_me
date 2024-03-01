const Customer = require('../../models/customerModel')

const deleteCustomer = async (req, res) => {
    try {
        const response = await Customer.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in deletebyID "+error
        })
    }
}

module.exports = deleteCustomer;