const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    vendor: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'GBP'
    },
    status: {
        type: String,
        enum: ['pending', 'review', 'approved', 'rejected'],
        default: 'pending'
    },
    issueDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    description: String,
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
invoiceSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice; 