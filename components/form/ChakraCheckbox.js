import { useEffect } from 'react';
import { Checkbox } from '@chakra-ui/react';
import { Field } from 'formik';

const ChakraCheckbox = ({ name, type, title }) => {
  useEffect(() => {
    window.addEventListener(
      'touchmove',
      function (event) {
        event.preventDefault();
      },
      { passive: false }
    );

    return () => {
      window.removeEventListener(
        'touchmove',
        function (event) {
          event.preventDefault();
        },
        { passive: false }
      );
    };
  }, []);
  return (
    <Field name={name}>
      {(props) => {
        const { field } = props;
        return (
          <Checkbox
            {...field}
            colorScheme='pink'
            type={type}
            id={name}
            name={name}
            value={name}
          >
            {title}
          </Checkbox>
        );
      }}
    </Field>
  );
};

export default ChakraCheckbox;
