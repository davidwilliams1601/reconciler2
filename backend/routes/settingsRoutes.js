const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get settings
router.get('/', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        
        if (!settings) {
            settings = new Settings({
                googleVisionApiKey: '',
                dextApiKey: '',
                xeroConfig: {
                    clientId: '',
                    clientSecret: '',
                    redirectUri: '',
                    scope: 'offline_access accounting.transactions accounting.settings'
                }
            });
            await settings.save();
        }

        // Mask sensitive data before sending
        const maskedSettings = {
            googleVisionApiKey: settings.googleVisionApiKey ? '********' : '',
            dextApiKey: settings.dextApiKey ? '********' : '',
            xeroConfig: {
                clientId: settings.xeroConfig.clientId ? '********' : '',
                clientSecret: settings.xeroConfig.clientSecret ? '********' : '',
                redirectUri: settings.xeroConfig.redirectUri,
                scope: settings.xeroConfig.scope
            }
        };

        res.json(maskedSettings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ message: 'Error fetching settings', error: error.message });
    }
});

// Update settings
router.post('/', async (req, res) => {
    try {
        const { googleVisionApiKey, dextApiKey, xeroConfig } = req.body;

        // Validate required fields
        if (googleVisionApiKey === undefined || dextApiKey === undefined || !xeroConfig) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Validate Xero config
        if (!xeroConfig.clientId || !xeroConfig.clientSecret || !xeroConfig.redirectUri) {
            return res.status(400).json({ message: 'Missing required Xero configuration fields' });
        }

        let settings = await Settings.findOne();

        if (!settings) {
            settings = new Settings();
        }

        // Only update non-empty values
        if (googleVisionApiKey !== '********') {
            settings.googleVisionApiKey = googleVisionApiKey;
        }
        if (dextApiKey !== '********') {
            settings.dextApiKey = dextApiKey;
        }
        if (xeroConfig.clientId !== '********') {
            settings.xeroConfig.clientId = xeroConfig.clientId;
        }
        if (xeroConfig.clientSecret !== '********') {
            settings.xeroConfig.clientSecret = xeroConfig.clientSecret;
        }
        settings.xeroConfig.redirectUri = xeroConfig.redirectUri;
        settings.xeroConfig.scope = xeroConfig.scope;

        await settings.save();
        res.json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ message: 'Error updating settings', error: error.message });
    }
});

module.exports = router; 