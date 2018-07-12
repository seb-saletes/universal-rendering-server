import Mongoose from 'mongoose'

const cardSchema = Mongoose.Schema({
  id: Number,
  listId: Number,
  title: String,
  content: String,
})

export {
  cardSchema,
}

export default Mongoose.model('card', cardSchema)
