import React from 'react';
import { Box } from '@mui/material';
import CourseCard from './CourseCard'; 
import Typography from '@mui/material/Typography';

const CourseGrid = ({ courses, onCourseClick }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                padding: 2,
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)', 
                    gap: 2,
                }}
            >
                {courses.map((course, index) => (
                    <CourseCard key={index} course={course} onClick={() => onCourseClick(course._id)} />
                ))}
            </Box>
        </Box>
    );
};


export default CourseGrid;
