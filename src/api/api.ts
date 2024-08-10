// src/api.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your base API URL
  timeout: 9000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
