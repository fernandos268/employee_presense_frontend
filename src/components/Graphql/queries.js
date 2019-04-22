import { gql } from 'apollo-boost';

const fetchUserData = gql`
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
  }
`;

const fetchUsers = gql`
  {
    users {
      _id
      firstName
      lastName
      suffix
      username
      email
    }
  }
`;

export { fetchUsers, fetchUserData };
