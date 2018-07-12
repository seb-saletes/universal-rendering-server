import Mongoose from 'mongoose'
import List from './list'

const isProd = process.env.NODE_ENV === 'production'
const mongoUri = isProd ? process.env.MONGODB_URI : 'mongodb://localhost/list'

Mongoose.Promise = global.Promise

Mongoose.connect(mongoUri)

List.remove({})

const card1 = { id: 1, listId: 1, title: 'card 1' }
const card2 = { id: 2, listId: 1, title: 'card 2' }
const card3 = { id: 3, listId: 2, title: 'card 3' }
const card4 = { id: 4, listId: 2, title: 'card 4' }
const list1 = { id: 1, title: 'list 1', cards: [card1, card2] }
const list2 = { id: 2, title: 'list 2', cards: [card3, card4] }

const saveList = (data) => {
  const list = new List(data)
  list.save((err) => {
    if (err) console.log(err)
    console.log('New list saved')
  })
}

saveList(list1)
saveList(list2)
