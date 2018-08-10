import Mongoose from 'mongoose'
import { cardSchema } from './card'

const listSchema = Mongoose.Schema({
  user: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
  title: String,
  cards: [cardSchema],
})

export {
  listSchema,
}

export default Mongoose.model('list', listSchema)
