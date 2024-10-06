import axios from 'axios';

/* This file has the services and interacts with the APIs of 
courses features and operations in the courses admin page*/

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
    console.error('Full Error Response:', error.response);

    const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         error.response?.statusText || 
                         'An error occurred';
    console.error('Error creating course:', errorMessage);
    
    throw new Error(errorMessage);
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


export const searchCourseByTitle = async (title, token) => {
  try {
    const response = await axios.get(`${API_URL}/search/title/${title}`, {
      headers: {
        token: `LHub__${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error searching course by title (${title}):`, error);
    throw error;
  }
};

export const searchCourseBySubject = async (subject, token) => {
  try {
    const response = await axios.get(`${API_URL}/search/subject/${subject}`, {
      headers: {
        token: `LHub__${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error searching course by subject (${subject}):`, error);
    throw error;
  }
};

export const searchCourseByInstructor = async (instructor, token) => {
  try {
    const response = await axios.get(`${API_URL}/search/instructor/${instructor}`, {
      headers: {
        token: `LHub__${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching course by instructor (${instructor}):`, error);
    throw error;
  }
};

export const searchCourseByStartDate = async (startDate, token) => {
  try {
    const response = await axios.get(`${API_URL}/search/startdate/${startDate}`, {
      headers: {
        token: `LHub__${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching course by start date (${startDate}):`, error);
    throw error;
  }
};
