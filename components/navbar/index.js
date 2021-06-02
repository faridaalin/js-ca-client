import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Flex, Spacer, Box, Heading, Container } from '@chakra-ui/react';
import LogoutButton from '../buttons/LogoutButton';
import { useAuth } from '../../context/auth';
import styles from '../../styles/Navbar.module.css';
import ActiveLink from '../activeLink/';

const Navbar = () => {
  const [authToken] = useAuth();

  return (
    <Flex as='header' w='100%' py={4} className={styles.nav}>
      <Container maxW='container.xl'>
        <Flex as='nav' w='100%'>
          <Box>
            <Heading size='md'>
              <NextLink href='/' passHref>
                <Link
                  color='pink.500'
                  mr='4'
                  style={{ textDecoration: 'none' }}
                >
                  Foodtruck App
                </Link>
              </NextLink>
            </Heading>
          </Box>
          <Spacer />
          <Box>
            {authToken ? (
              <LogoutButton />
            ) : (
              <ActiveLink href='/login'>Log in</ActiveLink>
            )}
            <ActiveLink href='/contact'>Contact</ActiveLink>
          </Box>
          <Box>
            <ActiveLink href='/favourites'>Favourites</ActiveLink>
          </Box>
          <Box>
            <ActiveLink href='/'>Home</ActiveLink>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
