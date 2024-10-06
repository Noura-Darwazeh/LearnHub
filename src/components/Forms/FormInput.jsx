import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

/* This component is for the password inputs using in the website with providing the visibility*/


const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  error = false, 
  helperText = '', 
  isPassword = false, 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={label}
      name={name}
      type={inputType}  
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

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  isPassword: PropTypes.bool,
};

export default FormInput;
