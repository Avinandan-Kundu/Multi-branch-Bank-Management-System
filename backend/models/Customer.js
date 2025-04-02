const { Schema, model, models } = require('mongoose');

const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  branchId: { type: String, required: true }
}, { timestamps: true });

module.exports = models.Customer || model('Customer', customerSchema);
