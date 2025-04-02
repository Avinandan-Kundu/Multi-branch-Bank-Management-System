const Customer = require('../models/Customer');

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, pass, balance, branchId } = req.body;
    const newCustomer = new Customer({ name, email, pass, balance, branchId });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers
};
