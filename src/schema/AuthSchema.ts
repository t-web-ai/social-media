import Joi from "joi";
export const LoginSchema = Joi.object({
  email: Joi.string().required().email().label("Email"),
  password: Joi.string().required().min(8).label("Password"),
});

export const RegisterSchema = Joi.object({
  username: Joi.string().required().label("Username"),
  email: Joi.string().required().email().label("Email"),
  password: Joi.string().required().min(8).label("Password"),
});
