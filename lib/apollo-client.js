import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { useAuth } from '../context/auth';

const getAuthHeaders = () => {
  const [authToken] = useAuth();
  if (!authToken) return null;

  return {
    authorization: `Bearer ${authToken}`,
  };
};

const httpLink = createHttpLink({
  uri: process.env.STRAPI_GRAPHQL_API,
  headers: getAuthHeaders,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
