import axios from 'axios';

// Configure axios defaults
const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL // This will be set in the deployment platform
  : 'http://localhost:50001';

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor for error handling
axios.interceptors.request.use(
  config => {
    // You can add auth tokens here if needed
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Handle specific error cases here
      console.error('API Error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axios; 