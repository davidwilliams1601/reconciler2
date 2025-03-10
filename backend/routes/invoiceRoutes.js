const express = require('express');
const router = express.Router();

// TODO: Add invoice controller imports and route handlers
router.get('/', (req, res) => {
    res.json({ message: 'Invoice routes working' });
});

module.exports = router; 