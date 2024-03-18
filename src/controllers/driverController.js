const driverService = require("../services/driverService");
const updateDriverJoiSchema = require("../validation/updateDriverValidation");

exports.updateDriver = async (req, res) => {
  try {
      const { id } = req.params;
      const { error, value } = updateDriverJoiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const response = await driverService.updateDriver({ _id: id }, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: response,
      message: "driver details updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot find ID to update : " + error,
    });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await driverService.deleteDriver(id);
    return res.status(200).json({
      success: true,
      data: response,
      message: "Driver deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting driver " + error,
    });
  }
};

exports.availableDrivers = async (req, res) => {
    try {
        const availableDrivers = await driverService.availableDrivers({ availability: 'available'});
        res.status(200).json({ 
            success: true,
            drivers: availableDrivers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch available drivers" 
        });
    }
};