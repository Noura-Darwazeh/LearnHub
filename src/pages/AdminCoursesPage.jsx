import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import AddCourseDialog from '../components/CourseDialog/AddCourseDialog';
import UpdateCourseDialog from '../components/CourseDialog/UpdateCourseDialog';
import { fetchCourses, deleteCourse } from '../services/courseService';
import SnackbarAlert from '../components/SnackBar/SnackbarAlert';
import useCourseSearch from '../components/Search/useCourseSearch';
import SearchComponent from '../components/Search/SearchComponent';


/* This page is for manage the courses on the admin dashboard , it has a table of courses , 
edit , delete and add courses features. */

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(1);
  const [coursesPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchType, setSearchType] = useState('title');
  const [searchTerm, setSearchTerm] = useState('');
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

  const { handleSearch, loading: searchLoading } = useCourseSearch(token, loadCourses, setCourses, setSnackbar, searchType); // Pass searchType here

  useEffect(() => {
    loadCourses();
  }, [loadCourses, page]);

  const performSearch = async () => {
    await handleSearch(searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

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

  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', width: '100%' }}>
        <SearchComponent
          handleSearch={performSearch}
          searchType={searchType}
          setSearchType={setSearchType}
          handleKeyDown={handleKeyDown}
          searchTerm={searchTerm}       
          setSearchTerm={setSearchTerm} 
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
                    <TableCell>{course.instructors.join(', ')}</TableCell>
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
