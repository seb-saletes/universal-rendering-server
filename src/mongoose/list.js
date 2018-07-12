import Mongoose from 'mongoose'
import { cardSchema } from './card'

const listSchema = Mongoose.Schema({
  id: Number,
  title: String,
  cards: [cardSchema],
})

export {
  listSchema,
}

export default Mongoose.model('list', listSchema)
