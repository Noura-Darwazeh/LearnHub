import React from 'react';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

/** This code is for a button that navigates the user to the Home page */
const BackToHomeButton = ({ sx }) => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/HomePage');
    };

    return (
        <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={handleBackToHome}
            sx={sx}
        >
            Back to Home
        </Button>
    );
};

export default BackToHomeButton;