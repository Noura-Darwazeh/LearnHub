import axios from 'axios';

/* This file has the services and interacts with the APIs of 
users features and operations in the users admin page*/

const API_URL = "https://learnhub-backend-quk3.onrender.com/api/v1/user/admin";
const  USER_API_URL = "https://learnhub-backend-quk3.onrender.com/api/v1/user";

// Create a new user
export const createUser = async (userData, token) => {
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.post(`${API_URL}/createUser`, userData, {
      headers: {
        token: `LHub__${token}`,
      },
    });

    console.log("User created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error(error.response?.data?.message || 'Error creating user');
  }
};

// Get a user by ID
export const getUserById = async (userId, token) => {
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: {
        token: `LHub__${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Get all users
export const getAllUsers = async (token) => {
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.get(`${USER_API_URL}/allUsers`, {
      headers: {
        token: `LHub__${token}`,
      },
    });

    if (response.data.message === "Success") {
      return response.data.users;
    } else {
      throw new Error('Failed to fetch users');
    }
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (userId, token) => {
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    await axios.delete(`${API_URL}/user/${userId}`, {
      headers: {
        token: `LHub__${token}`,
      },
    });

    console.log("User deleted successfully");
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Update a user's password
export const updateUserPassword = async (userId, newPassword, token) => {
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.put(`${API_URL}/user/password/${userId}`, { password: newPassword }, {
      headers: {
        token: `LHub__${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

// Update user details
export const updateUser = async (userId, userData, token) => {
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.put(`${API_URL}/updateUser/${userId}`, userData, {
      headers: {
        token: `LHub__${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Search for users by username
export const searchUserByUsername = async (username, token) => {
    const response = await axios.get(`${API_URL}/users/search/name/${username}`, {
        headers: { token: `LHub__${token}` },
    });
    return response.data;
};

export const searchUserByEmail = async (email, token) => {
    const response = await axios.get(`${API_URL}/users/search/email/${email}`, {
        headers: { token: `LHub__${token}` },
    });
    return response.data;
};
