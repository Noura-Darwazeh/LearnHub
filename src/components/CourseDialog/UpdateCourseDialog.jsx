import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { updateCourse } from '../../services/courseService';
import SnackbarAlert from '../SnackBar/SnackbarAlert';

const UpdateCourseDialog = ({ open, onClose, token, course }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [capacity, setCapacity] = useState('');
  const [instructors, setInstructors] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [dateError, setDateError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (open && course) {
      setTitle(course.title);
      setSubject(course.subject);
      setCapacity(course.capacity);
      setInstructors(course.instructors.join(', '));
      setStartDate(course.startDate.split('T')[0]);
      setEndDate(course.endDate.split('T')[0]);
      setDescription(course.description);
    }
  }, [open, course]);

  const handleSubmit = async () => {
    setDateError('');

    if (new Date(startDate) > new Date(endDate)) {
      setDateError('Start date must be before end date');
      return;
    }

    const courseData = {
      title,
      description,
      instructors: instructors.split(',').map(instructor => instructor.trim()),
      startDate,
      endDate,
      capacity: parseInt(capacity, 10),
      subject,
    };

    try {
      const updatedCourse = await updateCourse(course._id, courseData, token);
      console.log("Updated Course:", updatedCourse);
      setSnackbar({ open: true, message: 'Course updated successfully!', severity: 'success' });
      clearFields();
      onClose();
    } catch (error) {
      console.error('Failed to update course:', error);
      setSnackbar({ open: true, message: 'Failed to update course', severity: 'error' });
    }
  };
  const clearFields = () => {
    setTitle('');
    setDescription('');
    setInstructors('');
    setStartDate('');
    setEndDate('');
    setCapacity('');
    setSubject('');
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Update Course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Course Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Subject"
            type="text"
            fullWidth
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Capacity"
            type="number"
            fullWidth
            variant="outlined"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Instructors (comma-separated)"
            type="text"
            fullWidth
            variant="outlined"
            value={instructors}
            onChange={(e) => setInstructors(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            error={!!dateError}
            helperText={dateError}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update Course
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
};

export default UpdateCourseDialog;