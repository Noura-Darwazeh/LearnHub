import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  TextField,
  Pagination,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { IconButton } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { Add, Search, Edit, Delete } from '@mui/icons-material';
import AddCourseDialog from '../components/CourseDialog/AddCourseDialog';
import UpdateCourseDialog from '../components/CourseDialog/UpdateCourseDialog';
import { fetchCourses, deleteCourse } from '../services/courseService';
import { searchCourseByTitle, searchCourseBySubject } from '../services/courseService';
import SnackbarAlert from '../components/SnackBar/SnackbarAlert';

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(1);
  const [coursesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchType, setSearchType] = useState('title');
  const token = localStorage.getItem('token');

  const loadCourses = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedCourses = await fetchCourses(token, page);
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setSnackbar({ open: true, message: 'Failed to load courses', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [page, token]);
  
  useEffect(() => {
    loadCourses();  // Load courses when the component mounts and when the page changes
  }, [loadCourses, page]);


  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);


  const handleDelete = async (id) => {
    setDeleting(true);
    const prevCourses = [...courses];
    try {
      setCourses(prevCourses.filter(course => course._id !== id));
      await deleteCourse(id);
      setSnackbar({ open: true, message: 'Course deleted successfully', severity: 'success' });
    } catch (error) {
      setCourses(prevCourses);
      console.error("Error deleting course:", error);
      setSnackbar({ open: true, message: 'Failed to delete course', severity: 'error' });
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setUpdateDialogOpen(true);
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      await loadCourses(); // Load all courses if no search term is provided
      return;
    }
  
    setLoading(true);
    try {
      let fetchedCourses;
      if (searchType === 'subject') {
        fetchedCourses = await searchCourseBySubject(searchTerm, token); // Fetch courses by subject
      } else {
        fetchedCourses = await searchCourseByTitle(searchTerm, token);  // Fetch courses by title
      }
      setCourses(fetchedCourses); 
    } catch (error) {
      console.error("Error searching courses:", error);
      setSnackbar({ open: true, message: 'Failed to search courses', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const toggleSearchType = () => {
    setSearchType((prevType) => (prevType === 'title' ? 'subject' : 'title'));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); 
    }
  };

  return (
    <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', width: '100%' }}>
      <TextField
  label={`Search by ${searchType}`} // Display the current search type
  variant="outlined"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onKeyDown={handleKeyDown}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Search />
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={toggleSearchType}>
          <FilterList />
        </IconButton>
      </InputAdornment>
    ),
  }}
/>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setDialogOpen(true)}
          style={{ height: '40px', fontSize: '0.875rem' }}
        >
          Add Course
        </Button>
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Instructors</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell style={{ paddingLeft: '60px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCourses.length > 0 ? (
                currentCourses.map(course => (
                  <TableRow key={course._id}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.subject}</TableCell>
                    <TableCell>{course.capacity}</TableCell>
                    <TableCell>
                      {course.instructors.join(', ')}
                    </TableCell>
                    <TableCell>{course.startDate}</TableCell>
                    <TableCell>{course.endDate}</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Button onClick={() => handleEdit(course)} size="small">
                          <Edit fontSize="small" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(course._id)}
                          size="small"
                          sx={{
                            color: 'inherit',
                            '&:hover': {
                              color: 'red',
                            },
                          }}
                          disabled={deleting}
                        >
                          {deleting ? <CircularProgress size={24} /> : <Delete fontSize="small" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">No courses found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        variant="outlined"
        shape="rounded"
        style={{ marginTop: '16px' }}
        disabled={totalPages === 0}
      />

      <AddCourseDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          loadCourses();
        }}
        token={token}
      />

      {selectedCourse && (
        <UpdateCourseDialog
          open={updateDialogOpen}
          onClose={() => {
            setUpdateDialogOpen(false);
            loadCourses();
          }}
          token={token}
          course={selectedCourse}
        />
      )}

      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Container>
  );
};

export default AdminCoursesPage;
