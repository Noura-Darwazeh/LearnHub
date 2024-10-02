import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box } from '@mui/material';

const CourseCard = ({ course, onClick }) => {
    const startDate = course?.startDate;
    const endDate = course?.endDate;

    const formatDate = (date) => {
        if (date) {
            const dateObj = new Date(date);
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return dateObj.toLocaleDateString(undefined, options);
        }
        return 'N/A';
    };
    const handleCardClick = () => {
        console.log("id"+course._id);
        window.location.href = `/course/${course._id}`; // Redirect to course details page
    };

    return (
        <Card
            onClick={handleCardClick}
            sx={{
                borderRadius: '15px',
                width: '250px',
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                },
                background: 'rgba(37, 150, 190, 0.7)',
                color: 'white',
                cursor: 'pointer',
            }}
        >
            <CardContent>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    {course.title}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    {course.subject}
                </Typography>
                <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
                    Starts: {formatDate(startDate)}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1, mt: -1 }}>
                <AccessTimeIcon fontSize="small" sx={{ color: 'white' }} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                    Ends: {formatDate(endDate)}
                </Typography>
            </Box>
        </Card>
    );
};

export default CourseCard;
