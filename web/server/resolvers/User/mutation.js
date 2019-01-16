import User from '../../models/User'
import { ObjectID } from 'mongodb'

//  create a new user       [x]
//  update a user email     [x]
//  update a user password  []
//  delete a user           [x]


export const createUser = async (parent, {data}, ctx, info)=>{
    const user = await User.create({ ...data })
    const newUser = {   id: user._id.toString(), 
                        name: user.name, 
                        email: user.email
                    }
    return newUser
}

export const updateUserEmail = async (parent, {data}, ctx, info)=>{
    const { id, email } = data
    const user = await User.findByIdAndUpdate( ObjectID( id ) , { $set: { email }},{new: true})
    return user
}

export const deleteUser = async (parent, {data}, ctx, info)=>{
    const { id } = data
    const user = await User.findByIdAndRemove( ObjectID(id) )
    return user
}