import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Add CORS headers to every request
  config.headers['Access-Control-Allow-Origin'] = 'https://client-theta-gules.vercel.app';
  return config;
}); 