import { Container, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { useAuth } from '../context/auth';

const admin = () => {
  const [authToken] = useAuth();
  const router = useRouter();

  if (!authToken) {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
  }

  return (
    <Layout>
      <Container>
        <Text>Hi 👋 - You are logged as admin user. </Text>
      </Container>
    </Layout>
  );
};

export default admin;
