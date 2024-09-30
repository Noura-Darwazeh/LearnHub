import React from 'react';
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

export default FormContainer;
