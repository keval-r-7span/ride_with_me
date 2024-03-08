const {Driver} = require("../models/driverModel");


exports.findDriver = async(query)=>{
    try {
        return await Driver.findOne(query);
    } catch (error) {
        throw error
    }
}

exports.registerUser = async(query)=>{
    try {
        return await Driver.create(query);
    } catch (error) {
        throw error
    }
}

 exports.updateDriver = async(id,query, option)=>{
  try {
      return await Driver.findByIdAndUpdate(id, query, option);
  } catch (error) {
      throw error;
  }
};

exports.deleteDriver = async(query)=>{
  try {
      return await Driver.findByIdAndDelete(query);
  } catch (error) {
      throw error
  }
};