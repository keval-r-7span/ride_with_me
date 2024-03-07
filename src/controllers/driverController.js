const driverService = require('../services/driverService');

const updateDriver = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, email, phoneNumber, vehicleDetails, updateAvailability, password, role} = req.body
      const response = await driverService.updateDriver(
          {_id: id},
          req.body ,
          {new:true }
      )
      return res.status(200).json({
          success: true,
          data: response,
          message: "driver details updated Successfully"
      })      
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "Cannot find ID to update : "+error
      })
  }
};

const deleteDriver = async (req, res) => {
  try {
      const {id} = req.params
      const response = await driverService.deleteDriver(id);
      return res.status(200).json({
        success: true,
        data: response,
        message: "Driver deleted successfully!"
      })
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "Error while deleting driver "+error
      })
  }
};

module.exports = {
  updateDriver,
  deleteDriver
};
