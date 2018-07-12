import { ApolloServer } from 'apollo-server'
import './mongoose/_init'
import Schema from './graphql/schema'

const server = new ApolloServer({schema: Schema})

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
