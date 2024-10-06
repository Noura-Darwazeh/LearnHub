import Joi from "joi";

/* This code is for password validation conditions in our website */

const passwordValidationSchema = Joi.string()
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/)
  .required()
  .messages({
    "string.pattern.base": "Password must include at least one upper case letter, one lower case letter, and one special character",
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 8 characters long",
  });

export default passwordValidationSchema;
