import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    device: [{
        type: Schema.Types.ObjectId,
        ref: 'device'
    }],
    password: String
})

const User = mongoose.model('user', userSchema)

export default User