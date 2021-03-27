import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.STRAPI_GRAPHQL_API}`,
});

export default instance;
