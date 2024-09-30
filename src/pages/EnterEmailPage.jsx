import React, { useState } from 'react';
import { Box, Grid, Paper, CssBaseline, Typography } from '@mui/material';
import {  useNavigate } from "react-router-dom";
import { sendCode } from '../services/authService.js';
import FormContainer from '../components/Forms/FormContainer';
import FormHeader from '../components/Forms/FormHeader';
import FormInput from '../components/Forms/FormInput';
import FormButton from '../components/Forms/FormButton';
import FormLink from '../components/Forms/FormLink';
import SnackbarAlert from '../components/SnackBar/SnackbarAlert.jsx';
import Joi from 'joi';

const EnterEmailPage = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const navigate = useNavigate();

    const validateEmail = () => {
        const schema = Joi.string().email({ tlds: { allow: false } }).required().messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
        });
        const { error } = schema.validate(email);
        if (error) {
            setEmailError(error.message);
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateEmail()) return;
        setLoading(true);

        try {
            const response = await sendCode(email);

            if (response.data.message === "success") {
                setSnackbarMessage('Code sent successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);

                
                setTimeout(() => {
                    navigate('/EnterCodePage', { state: { email } });
                }, 2000);
            } else if (response.data.message === "invalid account") {
                setEmailError('Invalid account. Please check your email address.');
                setSnackbarMessage('Invalid account. Please check your email address.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else {
                setEmailError('An unexpected error occurred. Please try again.');
                setSnackbarMessage('An unexpected error occurred. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            setEmailError('Failed to send reset link. Please try again.');
            setSnackbarMessage('Failed to send reset link. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            console.error('Error sending code:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MHxwaG90by14bGx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <FormContainer>
                    <FormHeader title="Forgot Password" />
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                        <Typography>
                            Enter your email address and we'll send you a link to reset your password.
                        </Typography>
                        <FormInput
                            label="Email Address"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <FormButton
                            label={loading ? 'Sending...' : 'Send Reset Link'}
                            disabled={loading}
                        />
                        <Grid container>
                            <Grid item xs>
                                <FormLink to="/LoginPage" label="Back to Sign In" />
                            </Grid>
                        </Grid>
                    </Box>
                </FormContainer>
                <SnackbarAlert
                    open={snackbarOpen}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                    severity={snackbarSeverity}
                />
            </Grid>
        </Grid>
    );
};

export default EnterEmailPage;
