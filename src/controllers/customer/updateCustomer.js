const Customer = require("../../models/customerModel");

const updateCustomer = async (req, res) => {
  try {
    const response = await Customer.findByIdAndUpdate(req.params.id);
    return res.status(200).json({
      success: true,
      message: "updated Successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot find id to update" + error,
    });
  }
};

module.exports = updateCustomer;
