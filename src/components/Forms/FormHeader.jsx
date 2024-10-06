import React from 'react';
import PropTypes from 'prop-types'; 
import { Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

/* This component is for the hedaers of the pages in the authentication feature*/

const FormHeader = ({ title }) => (
  <>
    <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      {title}
    </Typography>
  </>
);

FormHeader.propTypes = {
  title: PropTypes.string.isRequired, 
};

export default FormHeader;
