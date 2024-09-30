import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import SnackbarAlert from '../../components/SnackBar/SnackbarAlert';

const UpdateCourseDialog = ({ open, onClose, course, onSubmit }) => {
  const [title, setTitle] = useState(course?.title || '');
  const [subject, setSubject] = useState(course?.subject || '');
  const [capacity, setCapacity] = useState(course?.capacity || '');
  const [instructors, setInstructors] = useState(course?.instructors.join(', ') || ''); 
  const [startDate, setStartDate] = useState(course?.startDate || '');
  const [endDate, setEndDate] = useState(course?.endDate || '');
  const [description, setDescription] = useState(course?.description || ''); 
  
 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setSubject(course.subject);
      setCapacity(course.capacity);
      setInstructors(course.instructors.join(', ')); 
      setStartDate(course.startDate);
      setEndDate(course.endDate);
      setDescription(course.description); 
    }
  }, [course]);

  const handleSubmit = () => {
    const updatedCourse = {
      title,
      description,
      instructors: instructors.split(',').map(i => i.trim()), 
      startDate,
      endDate,
      capacity: parseInt(capacity, 10), 
      subject,
    };

 
    try {
      onSubmit(course._id, updatedCourse);
      setSnackbarMessage('Course updated successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Failed to update course. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      onClose(); 
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
        open={snackbarOpen} 
        onClose={() => setSnackbarOpen(false)} 
        message={snackbarMessage} 
        severity={snackbarSeverity} 
      />
    </>
  );
};

export default UpdateCourseDialog;
