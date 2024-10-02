import axios from 'axios';

const API_URL = "https://learnhub-backend-quk3.onrender.com/api/v1/course";


export const fetchCourses = async (token, page) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${API_URL}/Courses`,
      headers: {
        token: `LHub__${token}`
      },
    });

    console.log("Full Response:", response);

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Unexpected response structure:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

export const deleteCourse = async (courseId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    await axios.delete(`${API_URL}/deleteCourses/${courseId}`, {
      headers: {
        token: `LHub__${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};



export const createCourse = async (courseData, token) => {
  if (!token) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const response = await axios.post(`${API_URL}/createCourse`, courseData, {
      headers: {
        token: `LHub__${token}`,
      },
    });

    console.log("Course created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};



export const updateCourse = async (courseId, courseData, token) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `${API_URL}/courses/${courseId}`,
      headers: {
        token: `LHub__${token}`,
      },
      data: courseData,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};
