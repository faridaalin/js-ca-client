import { useState } from 'react';
import {
  Stack,
  Button,
  Container,
  CircularProgress,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import axios from 'axios';

import contactSchema from './validationSchema/contactSchema';
import ChakraTextera from './ChakraTextera';
import ChakraInput from './ChakraInput';
import ChakraCheckbox from './ChakraCheckbox';

const initialFormData = {
  firstname: '',
  lastname: '',
  email: '',
  book_foodtruck: false,
  book_review: false,
  message: '',
};

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const showToast = (position, title, msg, status) => {
    return toast({
      position: position,
      title: title,
      description: msg,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };

  const onSubmit = async (values, onSubmitProps) => {
    setIsLoading(true);

    try {
      const res = await axios.post(
        'https://js-ca-backend.herokuapp.com/contacts',
        values
      );

      if (res.status === 200) {
        setIsLoading(false);
        onSubmitProps.resetForm();
        showToast('top', 'Success!', 'Your message has been sent.', 'success');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        if (error.response.status === 404) {
          return showToast('top', 'Error!', error.response.statusText, 'error');
        }
      } else {
        return showToast(
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
    <Container mb='8'>
      <Formik
        initialValues={initialFormData}
        validationSchema={contactSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <ChakraInput name='firstname' label='firstname' type='text' />
              <ChakraInput name='lastname' label='lastname' type='text' />
              <ChakraInput name='email' label='email' type='email' />
              <Stack spacing={10} direction='row' my='4'>
                <ChakraCheckbox
                  name='book_review'
                  type='checkbox'
                  title='Get Review'
                />
                <ChakraCheckbox
                  name='book_foodtruck'
                  type='checkbox'
                  title='Book foodtruck'
                />
              </Stack>
              <ChakraTextera name='message' label='message' />

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
                  'Send Message'
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default ContactForm;
