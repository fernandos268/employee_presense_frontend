import { gql } from 'apollo-boost';

// USER FUNCTIONS

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

//----------------------------------------------------------
// OVERTIME FUNCTIONS
const createOvertimeMutation = gql`
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
      }
    }
  }
`;

const deleteOvertimeMutation = gql`
  mutation($id: ID!) {
    deleteOvertime(overtimeId: $id) {
      ok
      errors {
        path
        message
      }
      overtime {
        date
        description
      }
    }
  }
`;
const updateOvertimeMutation = gql`
  mutation($id: ID!, $status: String!) {
    updateOvertime(overtimeId: $id, status: $status) {
      ok
      errors {
        path
        message
      }
      overtime {
        date
        description
      }
    }
  }
`;

//----------------------------------------------------------
// DAY OFF FUNCTIONS
const createDayOffMutation = gql`
  mutation(
    $startDate: String!
    $endDate: String!
    $duration: String!
    $description: String!
    $status: String!
    $approverId: ID!
  ) {
    createDayOff(
      dayoffInput: {
        startDate: $startDate
        endDate: $endDate
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
      dayoff {
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
        approver {
          firstName
          lastName
          suffix
        }
        status
      }
    }
  }
`;

const deleteDayOffMutation = gql`
  mutation($id: ID!) {
    deleteDayOff(dayOffId: $id) {
      ok
      errors {
        path
        message
      }
      dayoff {
        _id
      }
    }
  }
`;
const updateDayOffMutation = gql`
  mutation($id: ID!, $status: String!) {
    updateDayOff(dayOffId: $id, status: $status) {
      ok
      errors {
        path
        message
      }
      dayoff {
        _id
      }
    }
  }
`;

//----------------------------------------------------------
export {
  signinMutation,
  signupMutation,
  createOvertimeMutation,
  deleteOvertimeMutation,
  updateOvertimeMutation,
  createDayOffMutation,
  deleteDayOffMutation,
  updateDayOffMutation,
};
