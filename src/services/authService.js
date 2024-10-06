import axios from 'axios';

/* This file has the services and interacts with the APIs of 
authectication features and operations in the project*/

const API_URL = 'https://learnhub-backend-quk3.onrender.com/api/v1/auth';


export const signUP = async (userData) => {
    return await axios.post(`${API_URL}/signUp`, userData);
};

export const signIn = async ({ email, password }) => {
    return await axios.post(`${API_URL}/signIn`, { email, password });
};

export const sendCode = async (email) =>{
    return await axios.patch(`${API_URL}/sendCode`, {email});
}

export const verifyCode = async ({ email, code }) => {
    return await axios.post(`${API_URL}/verifyCode`, { email, code });
};

export const forgetPassword = async ({ code, email , newPassword }) => {
    return await axios.patch(`${API_URL}/forgetPassword`, { code, email , newPassword });
};
