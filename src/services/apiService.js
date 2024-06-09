import axios from 'axios';
import config from '../config';

const apiClient = axios.create({
  baseURL: config.apiUrl
});

// Interceptor to add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await apiClient.post('/users/login', { email, password });
  return response.data;
};

export const getProtectedData = async () => {
  const response = await apiClient.get('/api/protected');
  return response.data;
};

// Add other API methods as needed
