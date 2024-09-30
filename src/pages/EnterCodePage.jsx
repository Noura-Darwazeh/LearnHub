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
                    backgroundImage: 'url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MHxwaG90by14bGx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080)',
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
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            error={!!codeError}
                            helperText={codeError}
                        />
                        {apiError && <Typography color="error">{apiError}</Typography>}
                        <FormButton label="Verify Code" />
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
