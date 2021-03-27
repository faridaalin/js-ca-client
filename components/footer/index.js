import { Container, Text } from '@chakra-ui/react';
import styles from '../../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container
        maxW='container.xl'
        d='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Text fontSize='md'>&#169; Foodtruck App</Text>
      </Container>
    </footer>
  );
};

export default Footer;
