import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { getCourseDetails } from '../services/getCourseDetails'
import { enrollCourse } from '../services/enrollCourse '
import SnackbarAlert from "../components/SnackBar/SnackbarAlert";
import HomeButton from '../components/HomeButton/BackToHomeButton'

// This page displays detailed information about a specific course, including the title, instructors, start/end dates, capacity, and subject. 
// Users can register for the course if they are logged in. If not logged in, they will be redirected to the login page. 

const CourseDetailsContainer = styled(Container)({
  backgroundColor: '#f9f9f9',
  padding: '40px',
  borderRadius: '16px',
  maxWidth: '800px',
  marginTop: '50px',
  border: '1px solid #00749a',
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
  border: '1px solid #00749a',
});
const RegisterButton = styled(Button)({
  backgroundColor: '#00749a',
  color: '#fff',
  padding: '10px 20px',
  fontSize: '18px',
  marginTop: '30px',
});

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [disableRegister, setDisableRegister] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await getCourseDetails(courseId);
        setCourse(courseData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();

    const fromCourseCard = localStorage.getItem('fromCourseCard');
    if (fromCourseCard) {
      setDisableRegister(true);
      localStorage.removeItem('fromCourseCard');
    }
  }, [courseId]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedin(!!token);
  }, []);

  const handleRegisterClick = async () => {
    if (isLoggedin) {
      try {
        const token = localStorage.getItem('token');
        const response = await enrollCourse(courseId, token);
        if (response.status === 200) {
          setSnackbar({
            open: true,
            message: 'Registration has been completed successfully.',
            severity: 'success',
          });
        } else {
          setSnackbar({
            open: true,
            message: 'Registration was not successful.',
            severity: 'error',
          });
          setTimeout(() => {
            navigate("/LoginPage");
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error
          setSnackbar({
            open: true,
            message: 'The operation faild because you are not authorized',
            severity: 'error',
          });
        } else {
          setSnackbar({
            open: true,
            message: 'Failed',
            severity: 'error',
          });
        }
        setTimeout(() => {
          navigate("/LoginPage");
        }, 2000);
      }

    } else {
      setTimeout(() => {
        navigate("/LoginPage");
      }, 2000);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <HomeButton sx={{ color: '#00749a', borderColor: '#00749a' }}
      />
      <CourseDetailsContainer>

        <CourseTitle>{course.title}</CourseTitle>
        <CourseInfo>
          Instructor:
          <ul>
            {course && course.instructors.map((instructor, index) => (
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
        <RegisterButton onClick={handleRegisterClick} disabled={disableRegister}>
          Register for the Course
        </RegisterButton>
        <SnackbarAlert
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </CourseDetailsContainer>
    </>
  );

};

export default CourseDetailsPage;
