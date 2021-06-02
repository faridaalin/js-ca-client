import { useEffect } from 'react';
import { SimpleGrid, Text } from '@chakra-ui/react';
import Layout from '../components/layout';
import Card from '../components/card';
import { useFavs } from '../context/favsContext';

const favourites = () => {
  const [favourites, setFavourites] = useFavs();

  useEffect(() => {
    setFavourites({ type: 'saved' });
  }, []);

  return (
    <Layout title='Favourites'>
      {favourites.length > 0 ? (
        <SimpleGrid columns={[1, 2, null, 3, 4]} spacing='40px'>
          {favourites.map((foodtruck, i) => (
            <Card foodtruck={foodtruck} key={i} />
          ))}
        </SimpleGrid>
      ) : (
        <Text>Your favourites list is currently empty.</Text>
      )}
    </Layout>
  );
};

export default favourites;
