import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import FormInput from '../Forms/FormInput'; // Import your FormInput component
import passwordValidationSchema from '../PasswordValidation/passwordValidationSchema'; // Import your password validation schema
import SnackbarAlert from '../SnackBar/SnackbarAlert'; // Import your SnackbarAlert component
import { createUser } from '../../services/AdminUserService'; // Import your createUser function

const AddUserDialog = ({ open, onClose, token }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const validatePassword = (value) => {
    const { error } = passwordValidationSchema.validate(value);
    if (error) {
      setPasswordError(error.message);
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!username || !email || !password) {
      setSnackbar({ open: true, message: 'Please fill all fields', severity: 'error' });
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    const userData = {
      username,
      email,
      password,
    };

    try {
      const createdUser = await createUser(userData, token); // Call createUser function
      console.log("Created User:", createdUser); // For debugging
      setSnackbar({ open: true, message: 'User added successfully!', severity: 'success' });
      clearFields();
      onClose();
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    }
  };

  const clearFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordError('');
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <FormInput
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            isPassword={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
};

export default AddUserDialog;
