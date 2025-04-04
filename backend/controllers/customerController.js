const Customer = require('../models/Customer');
const Branch = require('../models/Branch');

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

// Deposit money to both customer and branch
const deposit = async (req, res) => {
  const { amount } = req.body;
  try {
    const customer = await Customer.findById(req.params.id);
    const branch = await Branch.findById(customer.branchId);

    if (!customer || !branch) return res.status(404).json({ error: 'Customer or branch not found' });

    if (branch.balance + amount > branch.cash_limit) {
      return res.status(400).json({ error: 'Branch cannot accept more cash. Try another branch.' });
    }

    customer.balance += amount;
    branch.balance += amount;

    await customer.save();
    await branch.save();

    res.json({ message: 'Deposit successful', customer, branch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Withdraw money from both customer and branch
const withdraw = async (req, res) => {
  const { amount } = req.body;
  try {
    const customer = await Customer.findById(req.params.id);
    const branch = await Branch.findById(customer.branchId);

    if (!customer || !branch) return res.status(404).json({ error: 'Customer or branch not found' });

    if (customer.balance < amount) return res.status(400).json({ error: 'Insufficient customer balance' });
    if (branch.balance < amount) return res.status(400).json({ error: 'Branch does not have enough cash. Try another branch.' });

    customer.balance -= amount;
    branch.balance -= amount;

    await customer.save();
    await branch.save();

    res.json({ message: 'Withdrawal successful', customer, branch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  deposit,
  withdraw
};
