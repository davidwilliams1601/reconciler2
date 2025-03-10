const express = require('express');
const Invoice = require('../models/Invoice');

const router = express.Router();

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
    try {
        // For now, return mock data since we don't have real data yet
        const mockStats = {
            totalInvoices: 0,
            pendingReview: 0,
            totalValue: 0
        };
        
        res.json(mockStats);
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ 
            message: 'Error fetching dashboard stats',
            error: error.message 
        });
    }
});

module.exports = router; 