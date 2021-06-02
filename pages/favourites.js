import { SimpleGrid, Text } from '@chakra-ui/react';
import { useFavourites } from '../context/favs';
import Layout from '../components/layout';
import Card from '../components/card';

const favourites = () => {
  const [favourites, setFavourites] = useFavourites();

  console.log('favourites PAGE:', favourites);
  return (
    <Layout title='Favourites'>
      {favourites.length === 0 ? (
        <Text>Your favourites list is currently empty.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, null, 3, 4]} spacing='40px'>
          {favourites.map((foodtruck) => (
            <Card foodtruck={foodtruck} key={foodtruck.id} />
          ))}
        </SimpleGrid>
      )}
    </Layout>
  );
};

export default favourites;
