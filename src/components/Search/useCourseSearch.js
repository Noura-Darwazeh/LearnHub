import { useState } from 'react';
import {
  searchCourseByTitle,
  searchCourseBySubject,
  searchCourseByInstructor,
  searchCourseByStartDate,
} from '../../services/courseService';

  /* This code provide the handling of the  search feature and filteration , 
  it used in multiple locations in the code. this search performed using Factory design pattern
   */
  const SearchMethodFactory = {
  getSearchMethod(searchType) {
    switch (searchType) {
      case 'subject':
        return searchCourseBySubject;
      case 'instructor':
        return searchCourseByInstructor;
      case 'startdate':
        return searchCourseByStartDate;
      default:
        return searchCourseByTitle;
    }
  },
};

const useCourseSearch = (token, loadCourses, setCourses, setSnackbar, searchType) => {
  const [loading, setLoading] = useState(false);

  const handleSearch = async (term) => {
    if (!term) {
      await loadCourses(); 
      return;
    }

    setLoading(true);
    try {
      const searchMethod = SearchMethodFactory.getSearchMethod(searchType);

      const fetchedCourses = await searchMethod(term, token);
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
