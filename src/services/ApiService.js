import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Login API
export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
  return response.data; // Assuming this returns the token
};

// Register API
export const register = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, { email, password });
  return response.data; // Assuming this returns the token
};

// Fetch CV Data
export const fetchCvData = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/cv/load`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Save CV Data
export const saveCvData = async (token, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/cv/save`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};