const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');

// Login
router.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(pass, customer.pass);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({ message: 'Login successful', customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
