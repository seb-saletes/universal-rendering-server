import Mongoose from 'mongoose'

const cardSchema = Mongoose.Schema({
  listId: String,
  title: String,
  content: String,
})

export {
  cardSchema,
}

export default Mongoose.model('card', cardSchema)
