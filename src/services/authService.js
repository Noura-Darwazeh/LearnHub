import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/auth';

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
