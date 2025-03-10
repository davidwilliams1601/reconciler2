# Invoice Reconciliation Application

A full-stack application for automated invoice processing and reconciliation using OCR technology and accounting integration.

## Features

- Dashboard with real-time statistics
- OCR-powered invoice processing
- Integration with Dext, Google Vision, and Xero
- Settings management for API keys
- Modern React.js frontend with Material-UI
- Node.js/Express.js backend with MongoDB

## Tech Stack

- Frontend:
  - React.js
  - Material-UI
  - Redux Toolkit
  - Axios
  - React Router

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Google Cloud Vision API

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/invoice-reconciliation.git
   cd invoice-reconciliation
   ```

2. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Fill in your API keys and configuration

4. Start the application:
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend (in a new terminal)
   cd frontend
   npm start
   ```

5. Access the application at `http://localhost:3000`

## Environment Variables

### Backend
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/invoice_reconciliation
GOOGLE_VISION_API_KEY=your_google_vision_api_key
```

### Frontend
```
REACT_APP_API_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 