import Mongoose from 'mongoose'

const isProd = process.env.NODE_ENV === 'production'
const mongoUri = isProd ? process.env.MONGODB_URI : 'mongodb://localhost/list'

Mongoose.Promise = global.Promise

Mongoose.connect(mongoUri)
