import { gql } from 'apollo-server'

const typeDef = gql`
  type Card {
    _id: String!
    listId: String!
    title: String!
  }
`

const resolvers = {}

export default {
  typeDef,
  resolvers,
}
