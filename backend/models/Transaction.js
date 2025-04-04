const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
  amount: { type: Number, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema, 'Transactions');
