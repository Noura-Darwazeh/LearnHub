import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { createCourse } from '../../services/courseService'; 
const AddCourseDialog = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [capacity, setCapacity] = useState('');
  const [instructors, setInstructors] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState(''); 

  const handleSubmit = async () => {
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
      const createdCourse = await createCourse(courseData);
      console.log("Created Course:", createdCourse);
      onSubmit(createdCourse);
      setTitle('');
      setSubject('');
      setCapacity('');
      setInstructors('');
      setStartDate('');
      setEndDate('');
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  };
  

  return (
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
  );
};

export default AddCourseDialog;
