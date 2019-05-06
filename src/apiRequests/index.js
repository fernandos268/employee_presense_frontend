import axios from 'axios';
import { getToken } from '../components/Auth/Auth';

const apiUrl = 'http://localhost:4040/graphql';

// USERS --------------------------------------------

// GET ALL USERS
export const fetchUsers = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: apiUrl,
      headers: { authorization: `Bearer ${getToken()}` },
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
// SIGN UP
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
        variables: user,
      },
    });

    const responseData = response.data.data.createUser;
    return { ...responseData, isLoading: false };
  } catch (e) {
    console.log(e);
  }
};
// SIGN IN
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

//  OVERTIME --------------------------------------------

// GET ALL OVERTIMES
export const fetchCurrentUserOvertimes = async userId => {
  try {
    const response = await axios({
      method: 'post',
      url: apiUrl,
      headers: { authorization: `Bearer ${getToken()}` },
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
    return response.data.data.fetchUser;
  } catch (e) {
    console.log(e);
  }
};
//CREATE OVERTIME
export const createOvertimeMutation = async overtime => {
  try {
    const response = await axios({
      url: apiUrl,
      headers: { authorization: `Bearer ${getToken()}` },
      method: 'post',
      data: {
        query: `
            mutation(
              $date: String!
              $startTime: String!
              $endTime: String!
              $duration: String!
              $description: String!
              $status: String!
              $approverId: ID!
            ) {
              createOvertime(
                overtimeInput: {
                  date: $date
                  startTime: $startTime
                  endTime: $endTime
                  duration: $duration
                  description: $description
                  status: $status
                  approverId: $approverId
                }
              ) {
                ok
                errors {
                  path
                  message
                }
                overtime {
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
              }
            }
          `,
        variables: overtime,
      },
    });
    const responseData = response.data.data.createOvertime;
    return responseData;
  } catch (e) {
    console.log(e);
  }
};

// DELETE OVERTIME
export const deleteOvertimeMutation = async overtimeId => {
  try {
    const response = await axios({
      url: apiUrl,
      headers: { authorization: `Bearer ${getToken()}` },
      method: 'post',
      data: {
        query: `
            mutation($id: ID!) {
              deleteOvertime(overtimeId: $id) {
                ok
                errors {
                  path
                  message
                }
                overtime {
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
              }
            }
          `,
        variables: { id: overtimeId },
      },
    });
    console.log({ deleteMutation: response });
    const responseData = response.data.data.deleteOvertime.overtime;
    return responseData;
  } catch (e) {
    console.log(e);
  }
};

// UPDATE OVERTIME
export const updateOvertimeMutation = async overtime => {
  try {
    const response = await axios({
      url: apiUrl,
      headers: { authorization: `Bearer ${getToken()}` },
      method: 'post',
      data: {
        query: `
            mutation($id: ID!, $status: String!) {
              updateOvertime(overtimeId: $id, status: $status) {
                ok
                errors {
                  path
                  message
                }
                overtime {
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
                  approver {
                    firstName
                    lastName
                    suffix
                  }
                }
              }
            }
          `,
        variables: overtime,
      },
    });
    const responseData = response.data.data.updateOvertime;
    return responseData;
  } catch (e) {
    console.log(e);
  }
};

//---------------------------------------------------------------------------------------------
export const fetchCurrentUserDayoffs = async user => {
  try {
    const response = await axios({
      method: 'post',
      url: apiUrl,
      headers: { authorization: `Bearer ${getToken()}` },
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
                description  console.log(userId);
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

//---------------------------------------------------------------------------
// GET ALL CURRENT USER'S OVERTIME & DAYOFF
export const fetchCurrentUserData = async userId => {
  try {
    const response = await axios({
      method: 'post',
      url: apiUrl,
      headers: { authorization: `Bearer ${getToken()}` },
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
                }
              }
            }
        `,
        variables: {
          id: userId,
        },
      },
    });
    const responseData = response.data.data.fetchUser;
    return responseData;
  } catch (e) {
    console.log(e);
  }
};
