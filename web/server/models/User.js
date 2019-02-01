import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    email: String,
    token: String,
    device: [{
        type: Schema.Types.ObjectId,
        ref: 'device'
    }],
    password: String
})

UserSchema.pre('save', async function(){
    const user = this
    console.log(user)
})

const User = mongoose.model('user', UserSchema)

export default User