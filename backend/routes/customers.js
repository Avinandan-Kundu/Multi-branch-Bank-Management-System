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

module.exports = router;
