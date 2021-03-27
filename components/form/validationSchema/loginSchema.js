import { object, string } from 'yup';

export const loginSchema = object({
  email: string().required('Email is required').email('Invalid email address.'),
  password: string().required('Password is required').min(6).max(12),
});
