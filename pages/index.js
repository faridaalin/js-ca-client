import { useState, useEffect } from 'react';
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
  const [data, setData] = useState(currentFoodtrucks);
  const [sortType, setSortType] = useState('');
  const [filtered, setFiltered] = useState([]);

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

  const handleFilter = (filteredWords) => {
    let latestArray = [];
    console.log('sortType.length > 0', sortType.length > 0);
    let trucksToFilter = sortType.length > 0 ? data : currentFoodtrucks;

    if (sortType.length > 0) {
      console.log('Filter the sorted array');
      console.log('sortType', sortType);
      let current = [];
      [...currentFoodtrucks].filter((truck) => {
        truck.categories.filter((category) => {
          if (filteredWords) {
            return filteredWords.filter((word) => {
              console.log('category', category.name);
              console.log('word', word);
              if (category.name === word) {
                current.push(truck);
                console.log('truck:', truck);
                return truck;
              }
            });
          }
        });
      });
      if (sortType === 'desc') {
        latestArray = current.sort((a, b) => b.ratings - a.ratings);
      } else {
        latestArray = current.sort((a, b) => a.ratings - b.ratings);
      }

      console.log('current', current);
      console.log('latestArray', latestArray);
    } else {
      console.log('Filter the orginal array');
      [...currentFoodtrucks].filter((truck) =>
        truck.categories.filter((category) => {
          if (filteredWords) {
            return filteredWords.filter((word) => {
              console.log('category', category.name);
              console.log('word', word);
              if (category.name === word) {
                latestArray.push(truck);
                return truck;
              }
            });
          }
        })
      );
    }
    const uniqueTrucks = Array.from(new Set(latestArray.map((a) => a.id))).map(
      (id) => {
        return latestArray.find((a) => a.id === id);
      }
    );
    console.log('uniqueTrucks 😀', uniqueTrucks);
    setData(uniqueTrucks.length === 0 ? currentFoodtrucks : uniqueTrucks);
    setFiltered(uniqueTrucks);
  };

  useEffect(() => {
    const sortArray = () => {
      let sorted;

      let trucksToSort =
        filtered.length === 0 ? [...currentFoodtrucks] : [...filtered];
      console.log('----', filtered.length);
      console.log('trucksToSort', trucksToSort);
      if (sortType === 'desc') {
        sorted = trucksToSort.sort((a, b) => b.ratings - a.ratings);
        setData(sorted);
      } else {
        sorted = trucksToSort.sort((a, b) => a.ratings - b.ratings);

        setData(sorted);
      }
    };
    console.log(
      ' [...filtered].length > 0 ? [...filtered] : [...currentFoodtrucks]',
      [...filtered].length > 0 ? 'filtered' : 'currentFoodtrucks'
    );
    console.log(' [...filtered].length', [...filtered].length);
    sortArray(sortType);
  }, [sortType]);

  useEffect(() => {
    handleFilter();
  }, []);

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
                onChange={(e) => handleFilter(e)}
              >
                {uniqueCategories.map((category) => (
                  <MenuItemOption value={category}>{category}</MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>

          <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme='blue'>
              Sort
            </MenuButton>
            <MenuList minWidth='240px'>
              <MenuOptionGroup
                title='Rating'
                type='radio'
                onChange={(e) => setSortType(e)}
              >
                <MenuItemOption value='asc'>Ascending</MenuItemOption>
                <MenuItemOption value='desc'>Descending</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Button>Reset</Button>
        </HStack>
      </Box>

      {data.length === 0 ? (
        <Text>
          Sorry, we don't have any foodtrucks available now. Try again later.
        </Text>
      ) : (
        <SimpleGrid columns={[1, 2, null, 3, 4]} spacing='40px'>
          {data.map((foodtruck) => (
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
