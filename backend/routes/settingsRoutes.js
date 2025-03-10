const express = require('express');
const router = express.Router();

// TODO: Add settings controller imports and route handlers
router.get('/', (req, res) => {
    res.json({ message: 'Settings routes working' });
});

module.exports = router; 