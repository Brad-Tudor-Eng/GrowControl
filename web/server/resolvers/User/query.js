import { ObjectID } from 'mongodb'
import User from '../../models/User'
import jwt from 'jsonwebtoken'

export const findUser = async (parent, {data}, ctx, info) =>{
    let token = data.token
    token = jwt.verify(token, process.env.JWT_KEY)
    const id = ObjectID(token.id)
    const user = await User.findById(id).populate('device')
    if(user){
    /*
        if the user has a device
        find all records
        keep first record,
        return just the dates for all other records.
    */



        return user
    }else{
        throw new Error('Invalid Token')
    }
    return null
}

