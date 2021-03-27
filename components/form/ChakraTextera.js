import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  isRequired,
} from '@chakra-ui/react';
import { Field } from 'formik';
import titleCase from '../../utils/titleCase';

const ChakraTextera = ({ name, label }) => {
  return (
    <Field name={name}>
      {(props) => {
        const { field, form } = props;
        return (
          <FormControl
            isInvalid={form.errors[name] && form.touched[name]}
            isRequired
          >
            <FormLabel htmlFor={label}>{titleCase(label)}</FormLabel>
            <Textarea
              {...field}
              mb='4'
              size='sm'
              name='message'
              id='message'
              name={name}
            />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default ChakraTextera;
