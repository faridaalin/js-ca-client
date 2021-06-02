import { AuthProvider } from '../context/auth';
import { FavProvider } from '../context/favs';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FavProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </FavProvider>
    </AuthProvider>
  );
}

export default MyApp;
