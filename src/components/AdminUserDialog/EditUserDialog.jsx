import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { updateUser, updateUserPassword } from '../../services/AdminUserService'; 
import SnackbarAlert from '../SnackBar/SnackbarAlert';
import passwordValidationSchema from '../PasswordValidation/passwordValidationSchema';
import FormInput from '../Forms/FormInput';

const EditUserDialog = ({ open, onClose, token, user }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (open && user) {
      setUsername(user.username);
      setEmail(user.email);
      setPassword(''); 
    }
  }, [open, user]);

  const handleSubmit = async () => {
    try {
      if (password) {
        const { error } = passwordValidationSchema.validate(password);
        if (error) {
          setPasswordError(error.message);
          return;
        } else {
          setPasswordError(''); 
        }
      }
  
     
      const userData = { username, email };
      await updateUser(user._id, userData, token);
  
      if (password) {
        await updateUserPassword(user._id, password, token);
      }
  
      setSnackbar({ open: true, message: 'User updated successfully!', severity: 'success' });
      onClose(); 
    } catch (error) {
      console.error('Failed to update user:', error);
      setSnackbar({ open: true, message: 'Failed to update user or password', severity: 'error' });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            label="New Password (optional)"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isPassword={true}
            error={!!passwordError}
            helperText={passwordError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update User
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

export default EditUserDialog;
