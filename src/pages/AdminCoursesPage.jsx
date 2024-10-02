import React, { useState, useEffect } from 'react';
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
import { Add, Search, Edit, Delete } from '@mui/icons-material';
import AddCourseDialog from '../components/CourseDialog/AddCourseDialog';
import UpdateCourseDialog from '../components/CourseDialog/UpdateCourseDialog';
import { fetchCourses, deleteCourse } from '../services/courseService';
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
  const token = localStorage.getItem('token');

  const loadCourses = async () => {
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
  };

  useEffect(() => {
    loadCourses();
  }, [page]);

  const filteredCourses = courses.filter(course =>
    course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

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

  return (
    <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', width: '100%' }}>
        <TextField
          label="Search by title"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
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
