import axios from 'axios';

const config = {
  baseURL: "http://localhost:3001"
};

const API = axios.create(config);

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password) => {
  const response = await API.post('/users/login', { username, password });
  return response.data;
};

export const getProtectedData = async () => {
  const response = await API.get('/api/protected');
  return response.data;
};