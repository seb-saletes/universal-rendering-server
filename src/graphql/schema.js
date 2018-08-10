import { makeExecutableSchema } from 'apollo-server'
import { merge } from 'lodash'

import List from './models/list'
import Card from './models/card'
import User from './models/user'

// Empty query is necessary to extend the query type and split schema
const Query = `
  type Query {
    _empty: String
  }
`

const Mutation = `
  type Mutation {
    _empty: String
  }
`

const schema = {
  typeDefs: [Query, Mutation, List.typeDef, Card.typeDef, User.typeDef],
  resolvers: merge({}, List.resolvers, Card.resolvers, User.resolvers),
}
export default makeExecutableSchema(schema)
