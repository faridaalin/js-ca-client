import { AuthProvider } from '../context/auth';
import { FavsProvider } from '../context/favsContext';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FavsProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </FavsProvider>
    </AuthProvider>
  );
}

export default MyApp;
