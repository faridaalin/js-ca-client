import dynamic from 'next/dynamic';
import client from '../../lib/apollo-client';
import { GET_FOODTRUCK, GET_ALL_FOODTRUCKS } from '../../graphql/queries';
import Layout from '../../components/layout';
import DetailCard from '../../components/detailCard';

const foodtruck = ({ data }) => {
  return (
    <Layout title='Details'>
      <DetailCard data={data} />
    </Layout>
  );
};

export default foodtruck;

export const getStaticPaths = async () => {
  const { data } = await client.query({
    query: GET_ALL_FOODTRUCKS,
  });

  const paths = data.foodtrucks.map((foodtruck) => ({
    params: { id: foodtruck.id },
  }));

  return { paths, fallback: false };
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
    console.error(err);
  }

  return {
    props: { data: foodtruck },
  };
};
