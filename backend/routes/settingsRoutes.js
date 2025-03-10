const express = require('express');
const router = express.Router();

// In-memory storage for API keys (replace with database storage in production)
let apiKeys = {
    dext: '',
    vision: '',
    xero: ''
};

// Get all API keys
router.get('/', (req, res) => {
    res.json(apiKeys);
});

// Update API keys
router.post('/', (req, res) => {
    const { dext, vision, xero } = req.body;
    
    // Validate input
    if (!dext || !vision || !xero) {
        return res.status(400).json({ message: 'All API keys are required' });
    }

    // Update keys
    apiKeys = {
        dext,
        vision,
        xero
    };

    res.json({ message: 'Settings updated successfully', keys: apiKeys });
});

module.exports = router; 