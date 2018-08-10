import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import './mongoose/_init'
import Schema from './graphql/schema'

const app = express()

// enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // <-- REQUIRED backend setting
}
const server = new ApolloServer({
  schema: Schema,
  context: ({ req }) => ({
    authtoken: req.header('authtoken'),
  }),
})

app.use(cors())

//
app.use((req, res, next) => {
  res.set({
    'access-control-allow-origin': 'localhost:3000',
    'Access-Control-Allow-Origin': 'localhost:3000',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTION',
  })
  next()
})

app.use(cookieParser())
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`))
