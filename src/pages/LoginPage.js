import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import { signIn } from '../services/authService';
import FormButton from '../components/Forms/FormButton';
import FormContainer from '../components/Forms/FormContainer';
import FormHeader from '../components/Forms/FormHeader';
import FormInput from '../components/Forms/FormInput';
import FormLink from '../components/Forms/FormLink';

/* This is a login page with storing the token in the local storage */


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const response = await signIn({ email, password });
      console.log("Login success", response.data);
      localStorage.setItem('token', response.data.token);
      const userRole = response.data.role;
      if (userRole === 'user') {
        navigate('/ProfilePage');
      } else if (userRole === 'admin') {
        navigate('/Dashboard');
      } else {
        setError('Unrecognized role. Please contact support.');
      }
    } catch (error) {
      console.log("Login failed", error);
      setError('Invalid email or password. Please try again.');
    }
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <FormContainer>
          <FormHeader title="Sign in" />
          {error && <Typography color="error">{error}</Typography>}
          <form noValidate onSubmit={handleSubmit}>
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isPassword={true}
            />
            <FormButton label="Sign In" onClick={handleSubmit} />
            <Grid container>
              <Grid item xs>
                <FormLink to="/EnterEmailPage" label="Forgot password?" />
              </Grid>
              <Grid item>
                <FormLink to="/SignUpPage" label="Don't have an account? Sign Up" />
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </FormContainer>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
