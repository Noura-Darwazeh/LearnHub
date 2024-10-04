import axios from 'axios';

const API_URL = 'https://learnhub-backend-quk3.onrender.com/api/v1/user';
const API_Users_URL = 'https://learnhub-backend-quk3.onrender.com/api/v1/enrollCourse/courses';

export const fetchUserProfile = async (token) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_URL}/profile`,
            headers: {
                'token': `LHub__${token}`,
            },
        });
        console.log('User profile response:', response.data);
        return response.data || null;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        if (error.response && error.response.status === 401) {
            throw new Error("Unauthorized. Please log in again.");
        }
        throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
};

export const updateUser = async (username, token) => {
    try {
        const response = await axios({
            method: 'put',
            url: `${API_URL}/updateUser`,
            headers: {
                'token': `LHub__${token}`,
            },
            data: { username },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update user');
    }
};


export const updatePassword = async (oldPassword, newPassword, token) => {
    try {
        const response = await axios({
            method: 'patch',
            url: `${API_URL}/updatePassword`,
            headers: {
                'token': `LHub__${token}`,
            },
            data: {
                oldPassword,
                newPassword,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating password:', error);
        throw new Error(error.response?.data?.message || 'Failed to update password');
    }
};


export const fetchUserCourses = async (token) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${API_Users_URL}/user`,
            headers: {
                'token': `LHub__${token}`,
            },
        });
        console.log('User courses response:', response.data);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching user courses:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch user courses');
    }
};


export const deleteUserAccount = async (token) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${API_URL}/delete`,
            headers: {
                'token': `LHub__${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete user account');
    }
};
