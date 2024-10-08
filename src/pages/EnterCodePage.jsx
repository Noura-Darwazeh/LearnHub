import React, { useState } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Joi from 'joi';
import { verifyCode } from '../services/authService';
import Typography from '@mui/material/Typography';
import FormContainer from '../components/Forms/FormContainer';
import FormHeader from '../components/Forms/FormHeader';
import FormInput from '../components/Forms/FormInput';
import FormButton from '../components/Forms/FormButton';
import FormLink from '../components/Forms/FormLink';
import SnackbarAlert from '../components/SnackBar/SnackbarAlert';

/* This page is one of the steps of the forget password feature , it is for entring the code to reset 
the password , with a validation for the code */


const EnterCodePage = () => {
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState('');
    const [apiError, setApiError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const validateCode = () => {
        const schema = Joi.string().min(1).required().messages({
            'string.base': 'Code must be a string',
            'any.required': 'Code is required',
            'string.empty': 'Code cannot be empty',
        });

        const { error } = schema.validate(code);
        if (error) {
            setCodeError(error.message);
            return false;
        }
        setCodeError('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateCode()) return;

        try {
            const response = await verifyCode({ email, code });
            if (response.status === 200) {
                navigate('/ResetPassword', { state: { email, code } });
            }
        } catch (error) {
            if (error.response) {
                setApiError(error.response.data.message || 'Invalid code. Please try again.');
                setSnackbarOpen(true);
            } else {
                setApiError('An unexpected error occurred. Please try again.');
                setSnackbarOpen(true);
            }
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <FormContainer>
                    <FormHeader title="Enter Code" />
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                        <Typography>Please enter the code sent to your email.</Typography>
                        <FormInput
                            label="Enter Code"
                            name="code"
                            type="text"
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            error={!!codeError}
                            helperText={codeError}
                        />
                        {apiError && <Typography color="error">{apiError}</Typography>}
                        <FormButton
                            label="Verify Code"
                            onClick={handleSubmit}
                        />
                        <Grid container>
                            <Grid item xs>
                                <FormLink to="/EnterEmailPage" label="Resend Code" />
                            </Grid>
                        </Grid>
                        <Box mt={5}></Box>
                    </Box>
                </FormContainer>
                <SnackbarAlert
                    open={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                    message={apiError}
                    severity="error"
                />
            </Grid>
        </Grid>
    );
};

export default EnterCodePage;
