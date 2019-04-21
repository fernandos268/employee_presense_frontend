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
        }
    }
  }
`

export { fetchOvertimes }