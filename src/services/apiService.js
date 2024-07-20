// src/services/apiService.js
import axiosInstance from './axiosInstance';

export const fetchData = async () => {
    try {
        const response = await axiosInstance.get('/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/auth', { user: email, pwd: password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};