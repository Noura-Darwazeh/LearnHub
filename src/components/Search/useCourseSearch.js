import { useState } from 'react';
import {
  searchCourseByTitle,
  searchCourseBySubject,
  searchCourseByInstructor,
  searchCourseByStartDate,
} from '../../services/courseService';


  /* This code provide the handling of the  search feature and filteration , 
  it used in multiple locations in the code. */


const useCourseSearch = (token, loadCourses, setCourses, setSnackbar, searchType) => {
  const [loading, setLoading] = useState(false);

  const handleSearch = async (term) => {
    if (!term) {
      await loadCourses(); 
      return;
    }

    setLoading(true);
    try {
      let fetchedCourses;
      switch (searchType) {
        case 'subject':
          fetchedCourses = await searchCourseBySubject(term, token);
          break;
        case 'instructor':
          fetchedCourses = await searchCourseByInstructor(term, token);
          break;
        case 'startdate':
          fetchedCourses = await searchCourseByStartDate(term, token);
          break;
        default:
          fetchedCourses = await searchCourseByTitle(term, token);
      }
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error searching courses:", error);
      setSnackbar({ open: true, message: 'Failed to search courses', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return { handleSearch, loading };
};

export default useCourseSearch;
