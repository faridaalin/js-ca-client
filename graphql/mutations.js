import { gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation(
    $firstname: String!
    $lastname: String
    $email: String
    $message: String!
    $book_review: Boolean!
    $book_foodtruck: Boolean!
  ) {
    createContact(
      input: {
        data: {
          firstname: $firstname
          lastname: $lastname
          email: $email
          message: $message
          book_review: $book_review
          book_foodtruck: $book_foodtruck
        }
      }
    ) {
      contact {
        id
        firstname
      }
    }
  }
`;

export { LOGIN_USER, SEND_MESSAGE };
