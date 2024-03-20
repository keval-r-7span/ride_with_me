const CustomerSchema  = require("../models/customerModel");
const logger = require('../logger/logger')

exports.viewCustomer = async () => {
  try {
    return await CustomerSchema.find();
  } catch (error) {
    logger.error(error);
  }
};

exports.viewCustomerById = async (query) => {
  try {
    return await CustomerSchema.findById(query);
  } catch (error) {
    logger.error(error);
  }
};

exports.deleteCustomer = async (query) => {
  try {
    return await CustomerSchema.findByIdAndDelete(query);
  } catch (error) {
    logger.error(error);
  }
};

exports.updateCustomer = async (id, query) => {
  try {
    return await CustomerSchema.findByIdAndUpdate(id, query, { new: true });
  } catch (error) {
    logger.error(error);
  }
};

exports.findCustomer = async (query) => {
  try {
    return await CustomerSchema.findOne(query);
  } catch (error) {
    logger.error(error);
  }
};

exports.registerUser = async (query) => {
  try {
    return await CustomerSchema.create(query);
  } catch (error) {
    logger.error(error);
  }
};

exports.updateSingle = async (get, set, option) => {
  try {
    return await CustomerSchema.updateOne(get, set, option);
  } catch (error) {
    logger.error(error);
  }
};
