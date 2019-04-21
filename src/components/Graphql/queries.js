import { gql } from 'apollo-boost';

const fetchOvertimes = gql`
query fetchUser($id: ID!){
    fetchUser(userId: $id){
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
          }
          assignedOvertimes {
            _id
            date
            startTime
            endTime
            duration
            description
            status
            creator{
              firstName
              lastName
              suffix
            }
          }
        }
    }
  }
`

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
`

export { fetchOvertimes, fetchUsers }