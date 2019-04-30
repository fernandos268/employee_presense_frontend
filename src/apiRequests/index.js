import axios from 'axios';
import { getToken } from '../components/Auth/Auth';

const URL = 'http://localhost:4040/graphql';

export const fetchUsers = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: URL,
      headers: { authorization: getToken() },
      data: {
        query: `
            query  {
                users {
                    _id
                    firstName
                    lastName
                    suffix
                    username
                    email
                }
            }`,
      },
    });
    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const signupMutation = async user => {
  try {
    const {
      firstName,
      lastName,
      suffix,
      username,
      email,
      password,
      isAdmin,
    } = user;

    const response = axios({
      url: url,
      method: 'post',
      data: {
        query: `
          mutation(
            $firstName: String!
            $lastName: String!
            $suffix: String
            $username: String!
            $email: String!
            $password: String!
            $isAdmin: Boolean!
          ) {
            createUser(
              userInput: {
                firstName: $firstName
                lastName: $lastName
                suffix: $suffix
                username: $username
                email: $email
                password: $password
                isAdmin: $isAdmin
              }
            ) {
              ok
              user {
                _id
                firstName
                lastName
                suffix
                username
                email
              }
              errors {
                path
                message
              }
            }
          }`,
        variables: {
          $firstName: firstName,
          $lastName: lastName,
          $suffix: suffix,
          $username: username,
          $email: email,
          $password: password,
          $isAdmin: isAdmin,
        },
      },
    });

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};
