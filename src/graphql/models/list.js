import { gql } from 'apollo-server'
import List from '../../mongoose/list'

const typeDef = gql`
  type List {
    _id: String!
    title: String!
    cards: [Card]
  }
  
  extend type Query {
    list(id: String!): List
    lists: [List]
  }

  extend type Mutation {
    createList(title: String!): List
    deleteList(_id: String!): List
  }
`
const resolvers = {
  Query: {
    lists: (root, args, context) => List.find({}).then(o => o),
  },
  Mutation: {
    createList: (root, args, context) => {
      const list = new List({ title: args.title })

      return new Promise((resolve, reject) => {
        list.save((err, res) => (err ? reject(err) : resolve(res)))
      })
    },
    deleteList: (root, args, context) => new Promise((resolve, reject) => {
      List.findByIdAndRemove(args._id).then(o => resolve(o))
    }),
  },
}

export default {
  typeDef,
  resolvers,
}
