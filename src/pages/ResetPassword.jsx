import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { forgetPassword } from "../services/authService";
import FormContainer from "../components/Forms/FormContainer";
import FormHeader from "../components/Forms/FormHeader";
import FormInput from "../components/Forms/FormInput";
import FormButton from "../components/Forms/FormButton";
import FormLink from "../components/Forms/FormLink";
import SnackbarAlert from "../components/SnackBar/SnackbarAlert";
import passwordValidationSchema from "../components/PasswordValidation/passwordValidationSchema";
import Joi from "joi";

/* This is the last step of the reset password page it has a validation and confirmation for the new password
and when the password reset successfully it shows a message for the user and go to the login page. */
const ResetPassword = () => {
  const location = useLocation();
  const { email, code } = location.state || {};
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const schema = Joi.object({
      newPassword: passwordValidationSchema,
      confirmPassword: Joi.string()
        .valid(Joi.ref("newPassword"))
        .required()
        .messages({
          "any.only": "Passwords do not match",
          "any.required": "Confirm password is required",
          "string.empty": "Confirm password cannot be empty",
        }),
    });

    const { error } = schema.validate({ newPassword, confirmPassword }, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      await forgetPassword({ code, email, newPassword });
      setOpenSnackbar(true);
      setErrors({});
      setTimeout(() => {
        navigate("/LoginPage");
      }, 2000);
    } catch (error) {
      console.error("Password reset error:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <FormContainer>
      <FormHeader title="Enter New Password" />
      <form noValidate onSubmit={handleSubmit}>
        <FormInput
          label="New Password"
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={errors.newPassword}
          helperText={errors.newPassword}
          isPassword={true}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          helperText={errors.confirmPassword}
          isPassword={true}
        />
        <FormButton label="Change Password" onClick={handleSubmit} />
        <FormLink to="/LoginPage" label="Back to Login" />
      </form>
      <SnackbarAlert
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Password changed successfully!"
      />
    </FormContainer>
  );
};

export default ResetPassword;
