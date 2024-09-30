import React, { useState } from "react";
import { signUP } from "../services/authService";
import FormContainer from "../components/Forms/FormContainer";
import FormHeader from "../components/Forms/FormHeader";
import FormInput from "../components/Forms/FormInput";
import FormButton from "../components/Forms/FormButton";
import FormLink from "../components/Forms/FormLink";
import SnackbarAlert from "../components/SnackBar/SnackbarAlert";
import { Grid, Typography } from "@mui/material";
import passwordValidationSchema from "../components/PasswordValidation/passwordValidationSchema";
import Joi from "joi";

const SignUpPage = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schema = Joi.object({
      username: Joi.string().min(3).max(15).required().messages({
        'any.required': 'Please provide your name',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be less than or equal to 15 characters long',
      }),
      email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
      }),
      password: passwordValidationSchema,
    });

    const { error } = schema.validate({ username, email, password }, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      const response = await signUP({ username, email, password });
      console.log('Sign up successful', response.data);
      setOpenSnackbar(true);
      setErrors({});
    } catch (error) {
      console.error('Sign up failed', error);
      setErrors({ api: 'Sign up failed. Please try again.' });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <FormContainer>
      <FormHeader title="Sign Up" />
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormInput
              label="Username"
              name="username"
              value={username}
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              error={errors.username}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helperText={errors.password}
              isPassword={true}
            />
          </Grid>
        </Grid>
        {errors.api && <Typography color="error">{errors.api}</Typography>}
        <FormButton label="Sign Up"  onClick={handleSubmit}/>
        <Grid container justifyContent="center">
          <Grid item>
            <FormLink to="/LoginPage" label="Already have an account? Sign in" />
          </Grid>
        </Grid>
      </form>
      <SnackbarAlert
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Sign up successful! Please confirm your email."
      />
    </FormContainer>
  );
};

export default SignUpPage;
