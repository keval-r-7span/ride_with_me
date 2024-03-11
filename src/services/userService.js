const { Customer } = require("../models/customerModel");

exports.viewCustomer = async () => {
  try {
    return await Customer.find();
  } catch (error) {
    throw error;
  }
};

exports.viewCustomerById = async (query) => {
  try {
    return await Customer.findById(query);
  } catch (error) {
    throw error;
  }
};

exports.deleteCustomer = async (query) => {
  try {
    return await Customer.findByIdAndDelete(query);
  } catch (error) {
    throw error;
  }
};

exports.updateCustomer = async (id, query) => {
  try {
    return await Customer.findByIdAndUpdate(id, query, { new: true });
  } catch (error) {
    throw error;
  }
};

exports.findCustomer = async (query) => {
  try {
    return await Customer.findOne(query);
  } catch (error) {
    throw error;
  }
};

exports.registerUser = async (query) => {
  try {
    return await Customer.create(query);
  } catch (error) {
    throw error;
  }
};
