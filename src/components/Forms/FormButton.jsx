import React from 'react';
import PropTypes from 'prop-types'; 
import { Button } from '@mui/material';

/* This component is for the Buttons used in the authentication feature*/

const FormButton = ({ label, onClick, disabled = false }) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    sx={{ mt: 3, mb: 2 }}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </Button>
);


FormButton.propTypes = {
  label: PropTypes.string.isRequired,        
  onClick: PropTypes.func.isRequired,          
  disabled: PropTypes.bool,                    
};

export default FormButton;
