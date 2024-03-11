const CustomerSchema = require('../models/customerModel')

exports.viewCustomer = async () => {
  try {
    return await Customer.find();
  } catch (error) {
    throw error;
  }
};

exports.viewCustomer = async()=>{
    try {
        return await CustomerSchema.find();
    } catch (error) {
        throw error
    }
}

exports.viewCustomerById= async(query)=>{
    try {
        return await CustomerSchema.findById(query);
    } catch (error) {
        throw error
    }
}

exports.deleteCustomer = async(query)=>{
    try {
        return await CustomerSchema.findByIdAndDelete(query);
    } catch (error) {
        throw error
    }
}

exports.updateCustomer = async(id,query)=>{
    try {
        return await CustomerSchema.findByIdAndUpdate(id, query,{new:true});
    } catch (error) {
        throw error
    }
}

exports.findCustomer = async(query)=>{
    try {
        return await CustomerSchema.findOne(query);
    } catch (error) {
        throw error
    }
}

exports.registerUser = async(query)=>{
    try {
        return await CustomerSchema.create(query);
    } catch (error) {
        throw error
    }
}
