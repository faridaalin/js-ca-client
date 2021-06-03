import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

function Logo(props) {
  return (
    <Box {...props}>
      <NextLink href='/' passHref>
        <Link
          color={['white', 'white', 'pink.500', , 'pink.500']}
          mr='4'
          style={{ textDecoration: 'none' }}
        >
          <Text fontSize='lg' fontWeight='bold'>
            Foodtruck App
          </Text>
        </Link>
      </NextLink>
    </Box>
  );
}

export default Logo;
