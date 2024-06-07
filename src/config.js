import axios from 'axios';

const config = {
  baseURL: "http://localhost:3001"
};

const API = axios.create(config);
