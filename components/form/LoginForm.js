import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Button,
  Container,
  CircularProgress,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useAuth } from '../../context/auth';
import { USER_TOKEN } from '../../config/constants';
import { loginSchema } from './validationSchema/loginSchema';
import ChakraInput from './ChakraInput';
import axios from 'axios';
import showToast from '../../utils/showToast';

const LoginForm = () => {
  const [, setAuthToken] = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const onSubmit = async (values, onSubmitProps) => {
    setIsLoading(true);

    try {
      const res = await axios.post('/api/login', {
        identifier: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        const { data } = res;
        setAuthToken(data.data.jwt);
        setIsLoading(false);
        localStorage.setItem(USER_TOKEN, JSON.stringify(data.data.jwt));
        onSubmitProps.resetForm();

        if (typeof window !== 'undefined') {
          router.push('/admin');
        }
      }
    } catch (error) {
      if (error.response && error.response.status) {
        if (error.response.status === 404) {
          return showToast('top', 'Error!', error.response.statusText, 'error');
        }
        if (error.response.status === 400) {
          return showToast(
            toast,
            'top',
            'Error!',
            'Email or password is invalid',
            'error'
          );
        }
      } else {
        return showToast(
          toast,
          'top',
          'Error!',
          'Something went wrong, please try again later.',
          'error'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <ChakraInput name='email' label='email' type='email' />
              <ChakraInput name='password' label='password' type='password' />

              <Button
                type='submit'
                colorScheme='pink'
                w='100%'
                mt='8'
                isDisabled={!(formik.dirty && formik.isValid)}
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size='24px' color='teal' />
                ) : (
                  'Log In'
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default LoginForm;
