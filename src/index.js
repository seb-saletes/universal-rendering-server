import { ApolloServer } from 'apollo-server'
import './mongoose/_init'
import Schema from './graphql/schema'

const server = new ApolloServer({ schema: Schema })

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
