const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    googleVisionApiKey: {
        type: String,
        required: true
    },
    dextApiKey: {
        type: String,
        required: true
    },
    xeroConfig: {
        clientId: {
            type: String,
            required: true
        },
        clientSecret: {
            type: String,
            required: true
        },
        redirectUri: {
            type: String,
            required: true
        },
        scope: {
            type: String,
            default: 'offline_access accounting.transactions accounting.settings'
        }
    },
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
settingsSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Settings', settingsSchema); 