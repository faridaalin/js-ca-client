import NextLink from 'next/link';
import Image from 'next/image';
import {
  Box,
  Badge,
  HStack,
  FormControl,
  FormLabel,
  Switch,
  Link,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import styles from '../../styles/Card.module.css';

const Card = ({ foodtruck }) => {
  return (
    <Box
      maxW='sm'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      className={styles.card}
    >
      <Box position='relative' w='100%' h={200}>
        <Image
          src={foodtruck.image_url}
          alt={foodtruck.name}
          layout='fill'
          objectFit='cover'
        />
      </Box>

      <Box p='6' className={styles.cardContent}>
        <HStack spacing='16px'>
          {foodtruck.categories.map((category, i) => (
            <Badge
              key={i}
              borderRadius='full'
              px='3.5'
              py='1.5'
              colorScheme='pink'
              fontSize='0.6em'
            >
              {category.name}
            </Badge>
          ))}
        </HStack>
        <Flex py='4'>
          <Box
            mt='2'
            mr='4'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
          >
            {foodtruck.name}
          </Box>

          <Spacer />
          <Box d='flex' mt='2' alignItems='center'>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  w={3}
                  h={3}
                  key={i}
                  color={i < foodtruck.ratings ? 'pink.500' : 'gray.300'}
                />
              ))}
          </Box>
        </Flex>

        <FormControl display='flex' alignItems='center'>
          <FormLabel
            htmlFor='favourite-resturant'
            mb='0'
            mr='auto'
            fontSize='0.8em'
            color='gray.500'
          >
            Add to favourites list?
          </FormLabel>
          <Switch id='favourite-resturant' colorScheme='pink' />
        </FormControl>

        <Box mt='4'>
          <NextLink href={`/detail/${foodtruck.id}`} colorScheme='teal' mr='4'>
            <Link
              color='pink.500'
              mr='4'
              fontSize='sm'
              className={styles.navItem}
            >
              Read more &rarr;
            </Link>
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
