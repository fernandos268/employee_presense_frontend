import axios from 'axios';
import { getToken } from '../components/Auth/Auth';

const apiUrl = 'http://localhost:4040/graphql';

// USERS --------------------------------------------

export const fetchUsers = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: apiUrl,
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

    const response = await axios({
      url: apiUrl,
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
          firstName: firstName,
          lastName: lastName,
          suffix: suffix,
          username: username,
          email: email,
          password: password,
          isAdmin: isAdmin,
        },
      },
    });

    const responseData = response.data.data.createUser;
    return { ...responseData, isLoading: false };
  } catch (e) {
    console.log(e);
  }
};

export const signinMutation = async user => {
  const { email, password } = user;
  try {
    const response = await axios({
      url: apiUrl,
      method: 'post',
      data: {
        query: `
          mutation($email: String!, $password: String!) {
            signin(email: $email, password: $password) {
              token
              ok
              errors {
                path
                message
              }
            }
          }
        `,
        variables: {
          email: email,
          password: password,
        },
      },
    });
    const responseData = response.data.data.signin;
    return { ...responseData, isLoading: false };
  } catch (e) {
    console.log(e);
  }
};

//  --------------------------------------------
export const fetchCurrentUserOvertimes = async userId => {
  console.log({ fetchCurrentUserOvertimes: userId });
  try {
    const response = await axios({
      method: 'post',
      url: apiUrl,
      headers: { authorization: getToken() },
      data: {
        query: `
        query fetchUser($id: ID!) {
          fetchUser(userId: $id) {
            ok
            errors {
              path
              message
            }
            user {
              createdOvertimes {
                _id
                date
                startTime
                endTime
                duration
                description
                status
                approver {
                  firstName
                  lastName
                  suffix
                }
              }
              assignedOvertimes {
                _id
                date
                startTime
                endTime
                duration
                description
                status
                creator {
                  firstName
                  lastName
                  suffix
                }
              }
            }
          }
        }`,
        variables: {
          id: userId,
        },
      },
    });
    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchCurrentUserDayoffs = async user => {
  try {
    const response = await axios({
      method: 'post',
      url: apiUrl,
      headers: { authorization: getToken() },
      data: {
        query: `
        query fetchUser($id: ID!) {
          fetchUser(userId: $id) {
            ok
            errors {
              path
              message
            }
            user {
              createdDayOffs {
                _id
                startDate
                endDate
                description
                duration
                approver {
                  firstName
                  lastName
                  suffix
                }
                status
              }
              assignedDayOffs {
                _id
                startDate
                endDate
                description
                duration
                creator {
                  firstName
                  lastName
                  suffix
                }
                status
              }
            }
          }
        }`,
        variables: {
          id: user.id,
        },
      },
    });
    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};
