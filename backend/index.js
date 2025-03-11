const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const invoiceRoutes = require('./routes/invoiceRoutes');
const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const xeroRoutes = require('./routes/xeroRoutes');

dotenv.config();
const app = express();

// Basic middleware
app.use(express.json());

// Configure CORS
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? ['https://reconciler-backend.onrender.com', 'https://reconciler-frontend.onrender.com']
        : ['http://localhost:3000', 'http://localhost:4001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Simple request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// API Routes - Define these BEFORE static file serving
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/xero', xeroRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Serve static files from frontend/public first (for development assets)
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Then serve the production build files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all handler for React router
app.get('/*', (req, res) => {
    // Don't handle API routes here
    if (req.url.startsWith('/api/')) {
        return res.status(404).json({ message: 'API endpoint not found' });
    }
    
    // Send the React app's index.html for all other routes
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connected Successfully');
    
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    });

    server.on('error', (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        switch (error.code) {
            case 'EACCES':
                console.error(`Port ${PORT} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`Port ${PORT} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
}); 