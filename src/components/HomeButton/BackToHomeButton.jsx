import React from 'react';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

/** This code is for a button that navigae the user to  the Home page */
const BackToHomeButton = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/HomePage');
    };

    return (
        <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={handleBackToHome}
            sx={{ color: 'white', borderColor: 'white' }}
        >
            Back to Home
        </Button>
    );
};

export default BackToHomeButton;
