import { gql } from 'apollo-server'
import Card from '../../mongoose/card'

const typeDef = gql`
  type Card {
    id: Int!
    listId: Int!
    title: String!
    content: String
  }`

const resolvers = {}

export default {
  typeDef,
  resolvers,
}
