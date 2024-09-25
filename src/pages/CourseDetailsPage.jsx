import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';

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
  const handleRegister = () => {
    alert('You have successfully registered for this course!');
  };

  return (
    <CourseDetailsContainer>
      <CourseTitle>React for Beginners</CourseTitle>
      <CourseInfo>Description: Learn the basics of React, including components, hooks, and more.</CourseInfo>
      <CourseInfo>Instructor: John Doe</CourseInfo>
      <CourseInfo>Start Date: 2024-10-01</CourseInfo>
      <CourseInfo>End Date: 2024-12-15</CourseInfo>
      <CourseInfo>Capacity: 30 students</CourseInfo>
      <CourseInfo>Subject: Web Development</CourseInfo>
      <CourseInfo>Created At: 2024-09-20</CourseInfo>

      <CourseDetailsBox>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Course Overview
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          This course will cover the foundational concepts of React, including state management, routing, and component lifecycles. Students will build interactive web applications and gain hands-on experience with one of the most popular JavaScript libraries.
        </Typography>
      </CourseDetailsBox>

      <RegisterButton onClick={handleRegister}>
        Register for the Course
      </RegisterButton>
    </CourseDetailsContainer>
  );
};

export default CourseDetailsPage;
