import React from 'react';
import PropTypes from 'prop-types'; 
import { Box, Container, CssBaseline } from '@mui/material';

const FormContainer = ({ children }) => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  </Container>
);

FormContainer.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default FormContainer;
