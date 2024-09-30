import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import { Grid, CircularProgress, Button, Box } from '@mui/material';
import CourseCard from '../components/CourseCard';
import { NewCoursesApi } from '../services/NewCoursesApi';

const HomePage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getCourses = async () => {
            try {
                const data = await NewCoursesApi();
                setCourses(data);
            } catch (err) {
                setError('Failed to load courses');
            } finally {
                setLoading(false);
            }
        };
        getCourses();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <div>{error}</div>;
    if (!courses || courses.length === 0) {
        return <div>No courses available</div>;
    }

    const handleLearnMore = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    const handleViewAll = () => {
        navigate('/courses')
    }
    return (
        <>
            <Navbar />
            <Slider />
            <Grid container spacing={3} padding={3}>
                {courses && courses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                        <CourseCard course={course} onLearnMore={handleLearnMore} />
                    </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="center" mb={1}>
                <Button variant="contained" sx={{ backgroundColor: '#00749A' }} onClick={handleViewAll}>View All</Button>
            </Box>
            <Footer />
        </>
    );
};

export default HomePage;
