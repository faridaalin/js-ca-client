import { gql } from '@apollo/client';

const GET_ALL_FOODTRUCKS = gql`
  {
    foodtrucks {
      id
      name
      image_url
      ratings
      categories {
        id
        name
      }
    }
  }
`;
const GET_FOODTRUCK = gql`
  query($id: ID!) {
    foodtruck(id: $id) {
      id
      name
      image_url
      ratings
      description
      categories {
        id
        name
      }
    }
  }
`;

export { GET_ALL_FOODTRUCKS, GET_FOODTRUCK };
