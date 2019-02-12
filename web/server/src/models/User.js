import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: String,
    token: String,
    device: [{
        type: Schema.Types.ObjectId,
        ref: 'device'
    }],
    password: String
})


const User = mongoose.model('user', UserSchema)

export default User