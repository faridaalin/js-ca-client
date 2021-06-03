import { AuthProvider } from '../context/auth';
import { FavsProvider } from '../context/favsContext';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FavsProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </FavsProvider>
    </AuthProvider>
  );
}

export default MyApp;
