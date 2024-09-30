import React from 'react';
import { Link as MUILink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const FormLink = ({ to, label }) => (
  <MUILink component={RouterLink} to={to} variant="body2">
    {label}
  </MUILink>
);

export default FormLink;
