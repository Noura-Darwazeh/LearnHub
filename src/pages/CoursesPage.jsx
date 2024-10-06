import { Grid, CircularProgress, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import AllCoursesApi from '../services/AllCoursesApi';
import CourseCard from '../components/CourseCard';
import SearchComponent from '../components/Search/SearchComponent';
import useCourseSearch from '../components/Search/useCourseSearch';
import SnackbarAlert from '../components/SnackBar/SnackbarAlert';
import HomeButton from '../components/HomeButton/BackToHomeButton'
import { useNavigate } from 'react-router-dom';

// This page is a course listing page that fetches and displays a list of courses using a grid layout. 

const CoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('title');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
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
    const { handleSearch } = useCourseSearch(null, getCourses, setCourses, setSnackbar, searchType);
    useEffect(() => {
        getCourses();
    }, []);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };
    if (loading) return <CircularProgress />;
    if (error) return <div>{error}</div>;
    const handleLearnMore = (courseId) => {
        navigate(`/course/${courseId}`);
    };
    return (
        <>
        
        <Box sx={{ border: '1px solid #00749a', margin: '20px', borderRadius: '8px' }}>
        <HomeButton sx={{ color: '#00749a', borderColor: '#00749a' }}
        />
            <Box display="flex" justifyContent="center" sx={{ marginTop: '20px' }}>
                <SearchComponent
                    handleSearch={handleSearch}
                    searchType={searchType}
                    setSearchType={setSearchType}
                    handleKeyDown={handleKeyDown}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </Box>
            <Grid container spacing={3} padding={3}>
                {courses && courses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                        <CourseCard course={course} onLearnMore={handleLearnMore} />
                    </Grid>
                ))}
            </Grid>
            <SnackbarAlert {...snackbar} />
        </Box>
        </>
    );
};
export default CoursePage;



