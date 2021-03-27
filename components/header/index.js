import { Heading } from '@chakra-ui/react';

const index = ({ title }) => {
  return (
    <Heading as='h1' size='md' py={4} style={{ textTransform: 'uppercase' }}>
      {title}
    </Heading>
  );
};

export default index;
