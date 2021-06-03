import {
  SimpleGrid,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
  HStack,
  Box,
} from '@chakra-ui/react';
import client from '../lib/apollo-client';
import { GET_ALL_FOODTRUCKS } from '../graphql/queries';
import Card from '../components/card';
import Layout from '../components/layout';

const Home = ({ foodtrucks }) => {
  const currentFoodtrucks = foodtrucks ? foodtrucks : [];

  const requests = [...currentFoodtrucks];
  function flatten(arr) {
    return arr.flat(Infinity);
  }
  const categories = requests.map((element) => {
    return element.categories.map((item) => item.name);
  });
  const flattenedCategories = flatten(categories);

  const uniqueCategories = flattenedCategories.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return (
    <Layout title='Home'>
      <Box>
        <HStack spacing='24px'>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme='blue'>
              Filter
            </MenuButton>
            <MenuList minWidth='240px'>
              <MenuOptionGroup
                title='Category'
                type='checkbox'
                onChange={(e) => console.log('Filter value:', e)}
              >
                {uniqueCategories.map((category) => (
                  <MenuItemOption value={category}>{category}</MenuItemOption>
                ))}

                <MenuItemOption value='country'>Country</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>

          <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme='blue'>
              Sort
            </MenuButton>
            <MenuList minWidth='240px'>
              <MenuOptionGroup
                defaultValue='asc'
                title='Rating'
                type='radio'
                onChange={(e) => console.log('Sort value:', e)}
              >
                <MenuItemOption value='asc'>Ascending</MenuItemOption>
                <MenuItemOption value='desc'>Descending</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </HStack>
      </Box>

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
