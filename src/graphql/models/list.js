import { gql } from 'apollo-server'
import List from '../../mongoose/list'

const typeDef = gql`
  extend type Query {
    list(id: String!): List
    lists: [List]
  }
  
  type List {
    id: String!
    title: String!
    cards: [Card]
  }`


const resolvers = {
  Query: {
    list: (root, args, context) => List.findOne({ id: args.id }).then(o => o),
    lists: (root, args, context) => List.find({}).then(o => o),
  },
}

export default {
  typeDef,
  resolvers,
}
