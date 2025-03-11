const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// The scopes we need for the application
const XERO_SCOPES = 'offline_access accounting.transactions accounting.settings';

// Generate Xero authorization URL
router.get('/auth-url', async (req, res) => {
    try {
        const settings = await Settings.findOne();
        if (!settings || !settings.xeroConfig.clientId) {
            return res.status(400).json({ message: 'Xero configuration not found' });
        }

        const authUrl = `https://login.xero.com/identity/connect/authorize?` +
            `response_type=code` +
            `&client_id=${settings.xeroConfig.clientId}` +
            `&redirect_uri=${encodeURIComponent(settings.xeroConfig.redirectUri)}` +
            `&scope=${encodeURIComponent(XERO_SCOPES)}` +
            `&state=${generateState()}`;

        res.json({ authUrl });
    } catch (error) {
        console.error('Error generating auth URL:', error);
        res.status(500).json({ message: 'Error generating authorization URL' });
    }
});

// Handle Xero OAuth callback
router.get('/callback', async (req, res) => {
    const { code, state } = req.query;

    if (!code) {
        return res.status(400).json({ message: 'Authorization code not received' });
    }

    try {
        const settings = await Settings.findOne();
        if (!settings) {
            return res.status(400).json({ message: 'Settings not found' });
        }

        // Exchange the authorization code for tokens
        const tokenResponse = await fetch('https://identity.xero.com/connect/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(
                    `${settings.xeroConfig.clientId}:${settings.xeroConfig.clientSecret}`
                ).toString('base64')
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: settings.xeroConfig.redirectUri
            })
        });

        const tokens = await tokenResponse.json();

        // Here you would typically store the tokens securely
        // For now, we'll just return success
        res.redirect('/settings?xero=success');
    } catch (error) {
        console.error('Error in Xero callback:', error);
        res.redirect('/settings?xero=error');
    }
});

// Generate a random state parameter for security
function generateState() {
    return Math.random().toString(36).substring(7);
}

module.exports = router; 