const express = require('express');
const router = express.Router();
const { createCustomer, getAllCustomers } = require('../controllers/customerController');

<<<<<<< Updated upstream
=======
// Proper route ordering
>>>>>>> Stashed changes
router.post('/', createCustomer);
router.get('/', getAllCustomers);
router.post('/:id/deposit', deposit);
router.post('/:id/withdraw', withdraw);

module.exports = router;