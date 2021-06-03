import { Button } from '@chakra-ui/react';
import client from '../../lib/apollo-client';
import { useAuth } from '../../context/auth';
import { USER_TOKEN } from '../../config/constants';

const LogoutButton = () => {
  const [, setAuthToken] = useAuth();

  const signOut = () => {
    setAuthToken(null);
    localStorage.removeItem(USER_TOKEN);
    client.resetStore();
  };

  return (
    <Button
      type='button'
      colorScheme='pink'
      variant='outline'
      onClick={signOut}
    >
      Sign out
    </Button>
  );
};

export default LogoutButton;
