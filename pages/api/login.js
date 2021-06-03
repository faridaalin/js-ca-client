import client from '../../lib/apollo-client';
import { LOGIN_USER } from '../../graphql/mutations';

export default async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const result = await client.mutate({
      mutation: LOGIN_USER,
      variables: {
        identifier,
        password,
      },
    });
    const { data } = result;

    res.status(200).send({ data: data.login });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
