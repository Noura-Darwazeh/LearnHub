import React from 'react';
import PropTypes from 'prop-types';
import { Link as MUILink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const FormLink = ({ to, label }) => (
  <MUILink component={RouterLink} to={to} variant="body2">
    {label}
  </MUILink>
);


FormLink.propTypes = {
  to: PropTypes.string.isRequired,  
  label: PropTypes.string.isRequired,  
};

export default FormLink;
