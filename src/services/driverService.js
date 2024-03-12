const driverSchema = require("../models/driverModel");

exports.findDriver = async(query)=>{
    try {
        return await driverSchema.findOne(query);
    } catch (error) {
        throw error;
    }
};

exports.registerUser = async(query)=>{
    try {
        return await driverSchema.create(query);
    } catch (error) {
        throw error;
    }
};

 exports.updateDriver = async(id,query, option)=>{
  try {
      return await driverSchema.findByIdAndUpdate(id, query, option);
  } catch (error) {
      throw error;
  }
};

exports.deleteDriver = async(query)=>{
  try {
      return await driverSchema.findByIdAndDelete(query);
  } catch (error) {
      throw error;
  }
};

exports.availableDrivers = async () => {
    try {
        return await driverSchema.find({ availability: 'available' }).select('name');
    } catch (error) {
        throw error;
    }
};

