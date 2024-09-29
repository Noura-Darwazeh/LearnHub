import { Grid, CircularProgress, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import AllCoursesApi from '../services/AllCoursesApi';
import CourseCard from '../components/CourseCard';
import Search from '../components/Search'
const CoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCourses = async () => {
            setLoading(true);
            try {
                const data = await AllCoursesApi();
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

    return (
        <Box sx={{ border: '1px solid #00749A', margin: '20px', borderRadius: '8px' }}>
            <Box display="flex" justifyContent="center" >

                <Search />
            </Box>
            <Grid container spacing={3} padding={3}>
                {courses && courses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                        <CourseCard course={course} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CoursePage;
