import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { createCourse } from '../../services/courseService';
import SnackbarAlert from '../SnackBar/SnackbarAlert';


/* This is a dialog for adding course on the users page on admin dashboard
it has the text fields that will take the course data and handle the create user logic
*/


const AddCourseDialog = ({ open, onClose, token }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [capacity, setCapacity] = useState('');
  const [instructors, setInstructors] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [dateError, setDateError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const handleSubmit = async () => {
    setDateError('');
  
 
    if (!title || !subject || !capacity || !instructors || !startDate || !endDate || !description) {
      setSnackbar({ open: true, message: 'Please fill all fields', severity: 'error' });
      return;
    }

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
      const createdCourse = await createCourse(courseData, token);
      console.log("Created Course:", createdCourse);
      setSnackbar({ open: true, message: 'Course added successfully!', severity: 'success' });
      clearFields();
      onClose();
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
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
        <DialogTitle>Add New Course</DialogTitle>
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
            Add Course
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

export default AddCourseDialog;
