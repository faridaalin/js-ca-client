import { SimpleGrid, Text } from '@chakra-ui/react';
import client from '../lib/apollo-client';
import { GET_ALL_FOODTRUCKS } from '../graphql/queries';
import Card from '../components/card';
import Layout from '../components/layout';

const Home = ({ foodtrucks }) => {
  const currentFoodtrucks = foodtrucks ? foodtrucks : [];

  return (
    <Layout title='Home'>
      {currentFoodtrucks.length === 0 ? (
        <Text>
          Sorry, we don't have any foodtrucks available now. Try again later.
        </Text>
      ) : (
        <SimpleGrid columns={[1, 2, null, 3, 4]} spacing='40px'>
          {foodtrucks.map((foodtruck) => (
            <Card foodtruck={foodtruck} key={foodtruck.id} />
          ))}
        </SimpleGrid>
      )}
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  let foodtrucks = null;

  try {
    const { data } = await client.query({ query: GET_ALL_FOODTRUCKS });
    foodtrucks = data.foodtrucks;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      foodtrucks,
    },
  };
};
