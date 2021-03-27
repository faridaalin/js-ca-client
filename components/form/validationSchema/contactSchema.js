import { object, string, bool } from 'yup';

export const contactSchema = object({
  firstname: string().required('First name is required').min(2).max(8),
  lastname: string().required('Last name is required').min(2).max(8),
  book_foodtruck: bool(),
  book_review: bool(),
  email: string().required('Email is required').email('Invalid email address.'),
  message: string().required('message is required').min(12).max(100),
});

export default contactSchema;
