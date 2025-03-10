# Invoice Reconciliation Application

A full-stack application for automated invoice reconciliation using OCR technology.

## Features

- Dashboard with real-time statistics
- Invoice processing and reconciliation
- Integration with Google Vision API for OCR
- MongoDB database for data persistence
- Modern React frontend with Material-UI
- Express.js backend API

## Project Structure

```
.
├── frontend/          # React frontend application
├── backend/           # Express.js backend API
└── README.md         # This file
```

## Prerequisites

- Node.js >= 16.0.0
- MongoDB Atlas account
- Google Cloud Vision API key

## Setup & Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd invoice-reconciliation
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Environment Setup:

Create a `.env` file in the backend directory with:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
GOOGLE_VISION_API_KEY=your_google_vision_api_key
```

4. Start the application:

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm start
```

## Development

- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:3000`

## Deployment

The application is configured for deployment on Render.com:
- Backend: Web Service
- Frontend: Static Site

## License

MIT 