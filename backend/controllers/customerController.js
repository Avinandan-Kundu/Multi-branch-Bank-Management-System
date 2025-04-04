const Customer = require('../models/Customer');
<<<<<<< Updated upstream
=======
const Branch = require('../models/Branch');
const Transaction = require('../models/Transaction');
>>>>>>> Stashed changes

// CREATE CUSTOMER
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

// GET ALL CUSTOMERS
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

<<<<<<< Updated upstream
=======
// Deposit money to both customer and branch
const deposit = async (req, res) => {
  const { amount } = req.body;
  try {
    const customer = await Customer.findById(req.params.id);
    const branch = await Branch.findById(customer.branchId);

    if (!customer || !branch) return res.status(404).json({ error: 'Customer or branch not found' });

    if (branch.balance + amount > branch.cash_limit) {
      return res.status(400).json({ 
        error: `Branch cannot accept more cash. Max allowed: $${branch.cash_limit - branch.balance}`
      });
    }

    // Update balances
    customer.balance += amount;
    branch.balance += amount;

    // 👇 CREATE TRANSACTION RECORD
    const transaction = new Transaction({
      type: 'deposit',
      amount,
      customerId: customer._id,
      branchId: branch._id
    });

    // Save all changes
    await Promise.all([customer.save(), branch.save(), transaction.save()]);

    res.json({ 
      message: 'Deposit successful',
      customer,
      branch,
      transactionId: transaction._id // Return transaction ID
    });

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
    if (branch.balance < amount) {
      return res.status(400).json({ 
        error: `Branch insufficient funds. Available: $${branch.balance}` 
      });
    }

    // Update balances
    customer.balance -= amount;
    branch.balance -= amount;

    // 👇 CREATE TRANSACTION RECORD
    const transaction = new Transaction({
      type: 'withdrawal',
      amount,
      customerId: customer._id,
      branchId: branch._id
    });

    // Save all changes
    await Promise.all([customer.save(), branch.save(), transaction.save()]);

    res.json({ 
      message: 'Withdrawal successful',
      customer,
      branch,
      transactionId: transaction._id // Return transaction ID
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

>>>>>>> Stashed changes
module.exports = {
  createCustomer,
  getAllCustomers
};
