
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get courseId from URL
import { Container, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const CourseDetailsContainer = styled(Container)({
  backgroundColor: '#f9f9f9',
  padding: '40px',
  borderRadius: '16px',
  maxWidth: '800px',
  marginTop: '50px',
  border:'1px solid #00749A'
});

const CourseTitle = styled(Typography)({
  fontSize: '32px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#333',
});

const CourseInfo = styled(Typography)({
  fontSize: '18px',
  marginBottom: '12px',
  color: '#666',
});

const CourseDetailsBox = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  marginTop: '20px',
  border:'1px solid #00749A'
});

const RegisterButton = styled(Button)({
  backgroundColor: '#00749A',
  color: '#fff',
  padding: '10px 20px',
  fontSize: '18px',
  marginTop: '30px',
});

const CourseDetailsPage = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`https://learnhub-backend-quk3.onrender.com/api/v1/course/CoursesDetails/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        setError('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <CourseDetailsContainer>
      <CourseTitle>{course.title}</CourseTitle>
      <CourseInfo>Instructor: 
        <ul>
      {course && course.instructors.map((instructor,index)=>(
        <li key={index}>{instructor}</li>
      ))}
      </ul>
      </CourseInfo>
      <CourseInfo>Start Date: {course.startDate}</CourseInfo>
      <CourseInfo>End Date: {course.endDate}</CourseInfo>
      <CourseInfo>Capacity: {course.capacity}</CourseInfo>
      <CourseInfo>Subject: {course.subject}</CourseInfo>
      <CourseInfo>Created At: {course.createdAt}</CourseInfo>

      <CourseDetailsBox>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Course Overview
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          {course.description}
        </Typography>
      </CourseDetailsBox>

      <RegisterButton>
        Register for the Course
      </RegisterButton>
    </CourseDetailsContainer>
  );
};

export default CourseDetailsPage;
