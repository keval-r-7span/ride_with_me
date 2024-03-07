const Driver = require("../models/driverModel");

 exports.updateDriver = async(id,query, option)=>{
  try {
      return await Driver.findByIdAndUpdate(id, query, option);
  } catch (error) {
      throw error;
  }
};

 exports.deleteDriver = async(query) => {
  try {
     return await Driver.findByIdAndDelete(query);
  } catch (error) {
    throw error; 
  }
};
