import axios from 'axios';

const API_BASE_URL = 'https://learnhub-backend-quk3.onrender.com/api/v1';

// send request to enroll course
export const enrollCourse = async (courseId, token) => {
  try {
    const config = {
      headers: {
        'token': `LHub__${token}`,
      },
    };
    const response = await axios.post(`${API_BASE_URL}/enrollcourse/enroll`, { courseId }, config);
    return response;
  } catch (error) {
    throw new Error('Error during registration');
  }
};
