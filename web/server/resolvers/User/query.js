import { ObjectID } from 'mongodb'
import User from '../../models/User'
import jwt from 'jsonwebtoken'

export const findUser = async (parent, {data}, ctx, info) =>{
    let token = data.token
    token = jwt.verify(token, process.env.JWT_KEY)
    const id = ObjectID(token.id)
    const user = await User.findById(id).populate('device')
    if(user){
        return user
    }else{
        throw new Error('Invalid Token')
    }
    return null
}

