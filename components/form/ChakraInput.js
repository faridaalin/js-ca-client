import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  isRequired,
} from '@chakra-ui/react';
import { Field } from 'formik';
import titleCase from '../../utils/titleCase';

const ChakraInput = ({ name, label, type }) => {
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
            <Input {...field} type={type} name={name} id={label} />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default ChakraInput;
