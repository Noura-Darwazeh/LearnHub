import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const FormInput = ({
  label, type, name, value, onChange, error, helperText, isPassword = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={label}
      name={name}
      type={isPassword ? (showPassword ? 'text' : 'password') : type}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      InputProps={isPassword ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handlePasswordVisibility} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : null}
    />
  );
};

export default FormInput;
