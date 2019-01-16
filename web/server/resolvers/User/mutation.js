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

export const updateUser = async (parent, {data}, ctx, info)=>{
    let user = await User.findById( ObjectID(data.id)) 
    if(data.email){user.email = data.email}
    //FIX ONCE AUTH IS IMPLICATED
    //VERY BAD!
    if(data.password){user.password = data.password}
    user.save()
    return user
}

export const deleteUser = async (parent, {data}, ctx, info)=>{
    const { id } = data
    const user = await User.findByIdAndRemove( ObjectID(id) )
    return user
}