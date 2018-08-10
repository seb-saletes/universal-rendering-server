import { gql } from 'apollo-server'

import User from '../../mongoose/user'
import List from '../../mongoose/list'
import Card from '../../mongoose/card'

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
    createCard(listId: String!, title: String!): Card
    deleteCard(listId: String!, cardId: String!): Card
    updateCard(listId: String!, cardId: String!, title: String!): Card
    moveCard(listId: String!, targetId: String!, cardId: String!, position: Int!): Card
  }
`
const resolvers = {
  Query: {
    lists: (root, args, context) => new Promise((resolve, reject) => {
      User.findOne(
        { token: context.authtoken },
        (err, user) => {
          if (err) return reject(err)
          if (!user) return reject(new Error('Invalid token.'))
          return List.find({ user }).then(o => resolve(o))
        },
      )
    }),
  },
  Mutation: {
    createList: (root, args, context) => new Promise((resolve, reject) => User.findOne(
      { token: context.authtoken },
      (err, user) => {
        if (err) return reject(err)
        if (!user) return reject(new Error('Invalid token.'))
        const list = new List({ title: args.title, user: user._id })

        return list.save((errList, res) => {
          if (errList) return reject(err)
          return resolve(res)
        })
      },
    )),
    deleteList: (root, args) => new Promise((resolve, reject) => {
      List.findByIdAndRemove(args._id).then(list => resolve(list))
    }),
    createCard: (root, args) => new Promise((resolve, reject) => {
      const card = new Card({ listId: args.listId, title: args.title })
      List.update({ _id: args.listId }, { $push: { cards: card } }, err => (err ? reject(err) : resolve(card)))
    }),
    deleteCard: (root, args) => new Promise((resolve, reject) => {
      List.findByIdAndUpdate(
        args.listId,
        { $pull: { cards: { _id: args.cardId } } },
        (err, list) => {
          if (err) reject(err)
          const card = list.cards.find(c => c._id.toString() === args.cardId)
          resolve(card)
        },
      )
    }),
    updateCard: (root, args) => new Promise((resolve, reject) => {
      List.findOneAndUpdate(
        { _id: args.listId, 'cards._id': args.cardId },
        { $set: { 'cards.$.title': args.title } },
        { new: true },
        (err, list) => {
          const card = list.cards.find(c => c._id.toString() === args.cardId)
          resolve(card)
        },
      )
    }),
    moveCard: (root, args) => new Promise((resolve, reject) => {
      List.findByIdAndUpdate(
        args.listId,
        { $pull: { cards: { _id: args.cardId } } },
        (err, list) => {
          if (err) reject(err)
          const card = list.cards.find(c => c._id.toString() === args.cardId)

          card.listId = args.targetId

          List.update(
            { _id: args.targetId },
            {
              $push: {
                cards: {
                  $each: [card],
                  $position: args.position,
                },
              },
            },
            errTarget => (errTarget ? reject(errTarget) : resolve(card)),
          )
        },
      )
    }),
  },
}

export default {
  typeDef,
  resolvers,
}
