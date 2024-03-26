const vehicleDetails = require("../models/vehicleDetails");

exports.findVehicle = async(query)=>{
    try {
        return await vehicleDetails.findOne(query);
    } catch (error) {
        throw error;
    }
};

exports.addVehicle = async(query)=>{
    try {
        return await vehicleDetails.create(query);
    } catch (error) {
        throw error;
    }
};

exports.updateVehicleDetails = async (id, query, option) => {
  try {
    return await vehicleDetails.findByIdAndUpdate(id, query, option);
  } catch (error) {
    throw error;
  }
};
