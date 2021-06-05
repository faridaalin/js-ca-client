import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SunIcon } from '@chakra-ui/icons';
import { AuthProvider } from '../context/auth';
import { FavsProvider } from '../context/favsContext';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <AuthProvider>
      <FavsProvider>
        <ChakraProvider theme={theme}>
          {pageLoading ? (
            <div className='globalSpinner'>
              <SunIcon w={100} h={100} />
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </ChakraProvider>
      </FavsProvider>
    </AuthProvider>
  );
}

export default MyApp;
