import { gql } from 'apollo-server'
import List from '../../mongoose/list'

const typeDef = gql`
  extend type Query {
    list(id: Int!): List
  }
  
  type List {
    id: Int!
    title: String!
    cards: [Card]
  }`


const resolvers = {
  Query: {
    list: (root, args, context) => List.findOne({ id: args.id }).then(o => o),
  },
}

export default {
  typeDef,
  resolvers,
}
