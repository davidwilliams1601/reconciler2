const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const invoiceRoutes = require('./routes/invoiceRoutes');
const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://reconciler-backend.onrender.com'
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// API Routes - Make sure these come BEFORE the static file serving
app.use('/api/invoices', invoiceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'build')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB with enhanced error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4
})
.then(() => {
  console.log('MongoDB Connected Successfully');
  startServer();
})
.catch(err => {
  console.error('MongoDB connection error details:', {
    name: err.name,
    message: err.message,
    code: err.code,
    stack: err.stack
  });
  
  if (err.name === 'MongoServerSelectionError') {
    console.error('Could not connect to MongoDB. Please check:');
    console.error('1. MongoDB connection string is correct');
    console.error('2. Network connectivity to MongoDB Atlas');
    console.error('3. IP address is whitelisted in MongoDB Atlas');
    console.error('4. Username and password are correct');
  }
  process.exit(1);
});

// Start server with error handling
function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
      server.close();
      app.listen(PORT + 1, () => {
        console.log(`Server running on port ${PORT + 1}`);
      });
    } else {
      console.error('Server error:', err);
    }
  });
} 