import { gql } from 'apollo-boost';

const signinMutation = gql`
  mutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      tokenExpiration
    }
  }
`;

export { signinMutation };
