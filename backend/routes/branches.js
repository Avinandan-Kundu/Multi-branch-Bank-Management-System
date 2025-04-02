const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');

// Get all branches
router.get('/', async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deposit to a branch
router.patch('/:id/deposit', async (req, res) => {
  const { amount } = req.body;
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) return res.status(404).json({ error: 'Branch not found' });

    if (branch.balance + amount > branch.cash_limit) {
      return res.status(400).json({ error: 'Deposit exceeds branch cash limit' });
    }

    branch.balance += amount;
    await branch.save();
    res.json(branch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Withdraw from a branch
router.patch('/:id/withdraw', async (req, res) => {
  const { amount } = req.body;
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) return res.status(404).json({ error: 'Branch not found' });

    if (branch.balance < amount) {
      return res.status(400).json({ error: 'Insufficient branch cash' });
    }

    branch.balance -= amount;
    await branch.save();
    res.json(branch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
