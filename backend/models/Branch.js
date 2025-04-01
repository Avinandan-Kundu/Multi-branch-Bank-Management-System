const { Schema, model, models } = require('mongoose');

const branchSchema = new Schema({
  location: { type: String, required: true },
  cash_limit: { type: Number, required: true },
  balance: { type: Number, required: true }
}, { timestamps: true });

module.exports = models.Branch || model('Branch', branchSchema, 'Branches'); // 👈 explicitly match Atlas name
