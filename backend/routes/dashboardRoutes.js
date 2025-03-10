const express = require('express');
const Invoice = require('../models/Invoice');

const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        const totalInvoices = await Invoice.countDocuments();
        const pendingReview = await Invoice.countDocuments({ status: 'review' });
        const totalValue = await Invoice.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);

        res.json({
            totalInvoices,
            pendingReview,
            totalValue: totalValue.length ? totalValue[0].total : 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats' });
    }
});

module.exports = router; 