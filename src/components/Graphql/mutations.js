import { gql } from 'apollo-boost';

const signinMutation = gql`
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
`;

const signupMutation = gql`
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
      email
      errors {
        path
        message
      }
    }
  }
`;

const createOvertimeMutation = gql`
mutation(
  $date: String!
  $startTime: String!
  $endTime: String!
  $duration: String!
  $description: String!
  $status: String!
) {
  createOvertime(
    overtimeInput: {
      date: $date
      startTime: $startTime
      endTime: $endTime
      duration: $duration
      description: $description
      status: $status

    }
  ) {
    ok
    errors {
      path
      message
    }
    overtime{
      _id
      date
      startTime
      endTime
      duration
      description
      status
    }
  }
}
`

export { signinMutation, signupMutation, createOvertimeMutation };
