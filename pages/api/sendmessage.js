import client from '../../lib/apollo-client';
import { SEND_MESSAGE } from '../../graphql/mutations';

export default async (req, res) => {
  console.log('req.body:😈', req.body);
  if (!req.body) {
    return res.status(404).send({ error: 'Missing fields' });
  }

  try {
    const result = await client.mutate({
      mutation: SEND_MESSAGE,
      variables: req.body,
    });
    const { data } = result;

    res.status(200).send({ data: data });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
};
