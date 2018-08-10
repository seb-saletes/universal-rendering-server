import Mongoose from 'mongoose'

const userSchema = Mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  token: String,
})

export {
  userSchema,
}

export default Mongoose.model('user', userSchema)
