const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  balance: { type: Number, default: 0 },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

customerSchema.pre('save', async function (next) {
  if (!this.isModified('pass')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema, 'Customer');

