import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Heading, Text, Container, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const DetailCard = ({ data }) => {
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Flex direction={['column', null, 'row']} my={8}>
        <Box position='relative' w='100%' h='50vh'>
          <Image
            src={data.image_url}
            alt={data.name}
            layout='fill'
            objectFit='cover'
          />
        </Box>

        <Container mt={[6, null, 0]} maxW='container.md'>
          <Box ml='6' w='100%'>
            <Heading as='h2' size='md' pb='2'>
              {data.name}
            </Heading>
            <Box d='flex' mt='2' alignItems='center' pb='8'>
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < data.ratings ? 'pink.500' : 'gray.300'}
                  />
                ))}
            </Box>
            <Text fontSize='sm' mb='8'>
              {data.description}
            </Text>

            <Link href='/contact'>
              <Button colorScheme='pink' variant='outline' w='100%' size='lg'>
                <a>Book</a>
              </Button>
            </Link>
          </Box>
        </Container>
      </Flex>
    </Box>
  );
};

export default DetailCard;
