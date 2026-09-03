const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  plan: { type: String, required: true },
  status: { type: String, enum: ['Completed', 'Pending', 'Failed'], default: 'Completed' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
