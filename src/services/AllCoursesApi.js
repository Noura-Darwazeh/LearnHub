import axios from 'axios';

const API_URL = 'https://learnhub-backend-quk3.onrender.com/api/v1/course/Courses'

 const AllCoursesApi = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    }
    catch(error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
}

export default AllCoursesApi;