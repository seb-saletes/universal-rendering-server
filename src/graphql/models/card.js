import { gql } from 'apollo-server'

const typeDef = gql`
  type Card {
    id: String!
    listId: Int!
    title: String!
    content: String
  }`

const resolvers = {}

export default {
  typeDef,
  resolvers,
}
