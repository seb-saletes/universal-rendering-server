import Mongoose from 'mongoose'

const cardSchema = Mongoose.Schema({
  listId: Number,
  title: String,
  content: String,
})

cardSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

export {
  cardSchema,
}

export default Mongoose.model('card', cardSchema)
