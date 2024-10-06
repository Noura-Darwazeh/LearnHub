import axios from 'axios';

const API_BASE_URL = 'https://learnhub-backend-quk3.onrender.com/api/v1';

// get course details by courseId
export const getCourseDetails = async (courseId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/course/CoursesDetails/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to load course details');
  }
};

