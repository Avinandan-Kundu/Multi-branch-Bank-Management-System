const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  deposit,
  withdraw
} = require('../controllers/customerController');

router.post('/:id/deposit', deposit);
router.post('/:id/withdraw', withdraw);
router.post('/', createCustomer);
router.get('/', getAllCustomers);
const Customer = require('../models/Customer');
const Branch = require('../models/Branch');

router.get('/test/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    const branch = await Branch.findById(customer.branchId);
    if (!branch) return res.status(404).json({ error: 'Branch not found' });

    res.json({ customer, branch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
