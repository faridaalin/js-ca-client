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
  useToast,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import client from '../lib/apollo-client';
import { GET_ALL_FOODTRUCKS } from '../graphql/queries';
import Card from '../components/card';
import Layout from '../components/layout';
import { filterFoodtruck } from '../lib/filterFoodtruck';
import showToast from '../utils/showToast';

const Home = (props) => {
  const { foodtrucks, error } = props;
  const currentFoodtrucks = foodtrucks ? foodtrucks : [];
  const [data, setData] = useState(currentFoodtrucks);
  const [sortType, setSortType] = useState('');
  const [filtered, setFiltered] = useState([]);
  const toast = useToast();

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

    if (sortType.length > 0) {
      let current = [];
      current = filterFoodtruck(currentFoodtrucks, filteredWords);
      if (sortType === 'desc') {
        latestArray = current.sort((a, b) => b.ratings - a.ratings);
      } else {
        latestArray = current.sort((a, b) => a.ratings - b.ratings);
      }
    } else {
      latestArray = filterFoodtruck(currentFoodtrucks, filteredWords);
    }
    const uniqueTrucks = Array.from(new Set(latestArray.map((a) => a.id))).map(
      (id) => {
        return latestArray.find((a) => a.id === id);
      }
    );

    setData(uniqueTrucks.length === 0 ? currentFoodtrucks : uniqueTrucks);
    setFiltered(uniqueTrucks);
  };

  useEffect(() => {
    const sortFoodtrucks = () => {
      let trucksToSort =
        filtered.length === 0 ? [...currentFoodtrucks] : [...filtered];
      if (sortType === 'desc') {
        setData(trucksToSort.sort((a, b) => b.ratings - a.ratings));
      } else {
        setData(trucksToSort.sort((a, b) => a.ratings - b.ratings));
      }
    };

    sortFoodtrucks();
  }, [sortType]);

  if (error || !foodtrucks) {
    const msg = error ? error : 'Something went wrong, please try again later.';
    return (
      <Layout title='Home'>
        {msg}
        {showToast(toast, 'top', 'Error!', msg, 'error')}
      </Layout>
    );
  }

  return (
    <Layout title='Home'>
      <Box mb='4'>
        <HStack spacing='24px'>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme='pink'>
              Filter <ChevronDownIcon w={6} h={6} />
            </MenuButton>
            <MenuList minWidth='240px'>
              <MenuOptionGroup
                title='Category'
                type='checkbox'
                onChange={(e) => handleFilter(e)}
              >
                {uniqueCategories.map((category, i) => (
                  <MenuItemOption key={i} value={category} isChecked={false}>
                    {category}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>

          <Menu closeOnSelect={true}>
            <MenuButton as={Button} colorScheme='pink'>
              Sort <ChevronDownIcon w={6} h={6} />
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
          <Button
            mt='8'
            onClick={() => {
              setFiltered(currentFoodtrucks);
              setData(currentFoodtrucks);
              setFiltered([]);
            }}
          >
            Reset
          </Button>
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
    return {
      props: {
        foodtrucks,
      },
    };
  } catch (err) {
    console.log('err????', err);
    console.log('MSG????1', err.message);
    if (err && err.message) {
      return { props: { error: err.message } };
    }
    if (err.response && err.response.data) {
      return {
        props: { error: err.response.data },
      };
    } else {
      return { props: { foodtruck: [] } };
    }
  }
};
