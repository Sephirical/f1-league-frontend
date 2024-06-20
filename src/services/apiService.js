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

export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/users/login', { username, password });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getSessions = async () => {
  try {
    const response = await apiClient.get('/sessions');
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const setSessionName = async (sessionId, name) => {
  try {
    const response = await apiClient.put(`/sessions/${sessionId}`, { name });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const createTTClassification = async (name, track) => {
  try {
    const response = await apiClient.post('/tt-classifications', { name, trackID: track });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export const getTTClassifications = async () => {
  try {
    const response = await apiClient.get('/tt-classifications');
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// Add other API methods as needed
