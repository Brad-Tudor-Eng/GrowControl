import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
})

const User = mongoose.model('user', userSchema)

export default User