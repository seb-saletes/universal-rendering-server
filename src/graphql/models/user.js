import { gql } from 'apollo-server-express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../../mongoose/user'

const typeDef = gql`
  type User {
    _id: String!
    username: String!
    password: String!
    token: String!
  }
  
  extend type Query {
    currentUser : User
  }

  extend type Mutation {
    createUser(username: String!, password: String!): String
    login(username: String!, password: String!) : String
  }
`
const resolvers = {
  Query: {
    currentUser: (root, args, context) => new Promise((resolve, reject) => {
      const token = context.authtoken
      if (!token) reject(new Error('No token provided.'))

      return User.findOne(
        { token: context.authtoken },
        (err, user) => {
          if (err) return reject(err)
          if (!user) return reject(new Error('Invalid token.'))
          return resolve(user)
        },
      )
    }),
  },
  Mutation: {
    createUser: (root, args) => {
      const token = jwt.sign({ id: args.username }, 'HKUST', { expiresIn: '365d' })
      const user = new User({ username: args.username, password: bcrypt.hashSync(args.password, 8), token })
      return new Promise((resolve, reject) => {
        user.save((err) => {
          if (err) return reject(new Error('Username already exist'))
          return resolve(token)
        })
      })
    },
    login: (root, args) => new Promise((resolve, reject) => {
      User.findOne(
        { username: args.username },
        (err, user) => {
          if (err) reject(err)
          if (!user) return reject(new Error('Username not found.'))

          const passwordIsValid = bcrypt.compareSync(args.password, user.password)

          if (!passwordIsValid) return reject(new Error('Wrong password'))

          const token = jwt.sign({ id: user._id }, 'HKUST', {
            expiresIn: '365d',
          })
          return resolve(token)
        },
      )
    }),
  },
}

export default {
  typeDef,
  resolvers,
}
