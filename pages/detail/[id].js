import { useToast } from '@chakra-ui/react';
import client from '../../lib/apollo-client';
import { GET_FOODTRUCK, GET_ALL_FOODTRUCKS } from '../../graphql/queries';
import Layout from '../../components/layout';
import DetailCard from '../../components/detailCard';
import showToast from '../../utils/showToast';

const foodtruck = (props) => {
  const { data, error } = props;

  const toast = useToast();
  if (error || !data) {
    const msg = error ? error : 'Something went wrong, please try again later.';

    return (
      <Layout title='details'>
        {msg}
        {showToast(toast, 'top', 'Error!', msg, 'error')}
      </Layout>
    );
  }
  return (
    <Layout title={data.name}>
      <DetailCard data={data} />
    </Layout>
  );
};

export default foodtruck;

export const getStaticPaths = async () => {
  try {
    const { data } = await client.query({
      query: GET_ALL_FOODTRUCKS,
    });

    const paths = data.foodtrucks.map((foodtruck) => ({
      params: { id: foodtruck.id },
    }));

    return { paths, fallback: true };
  } catch (err) {
    console.log('err🔥', err);
    console.log('MSG🔥3', err.message);
    return {
      props: { data: null },
    };
  }
};

export const getStaticProps = async ({ params }) => {
  let foodtruck = null;
  try {
    const { data } = await client.query({
      query: GET_FOODTRUCK,
      variables: { id: params.id },
    });

    foodtruck = data.foodtruck;
  } catch (err) {
    if (err && err.message) {
      return { props: { error: err.message } };
    }
    return {
      props: { error: null },
    };
  }
  return {
    props: { data: foodtruck },
  };
};
