const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    invoiceNumber: String,
    companyName: String,
    vatNumber: String,
    address: String,
    amount: Number,
    status: { type: String, enum: ['pending', 'review', 'approved'], default: 'pending' },
    confidence: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', InvoiceSchema); 