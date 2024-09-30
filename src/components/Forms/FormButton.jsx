import React from 'react';
import { Button } from '@mui/material';

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

export default FormButton;
