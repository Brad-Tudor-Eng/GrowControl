import User from '../../models/User'
import { ObjectID } from 'mongodb'


//  create a new user       [x]         
//  update a user email     [x]
//  update a user password  []
//  delete a user           [x]


export const createUser = async (parent, {data}, {req,res}, info)=>{
    console.log(req)
    
}

export const updateUser = async (parent, {data}, ctx, info)=>{
    let user = await User.findById( ObjectID(data.userId)) 
    if(data.email){user.email = data.email}
    //FIX ONCE AUTH IS IMPLICATED
    //VERY BAD!
    if(data.password){user.password = data.password}
    user.save()
    return user
}

export const addDeviceToUser = async (parent, {data}, ctx, info) =>{
    const {userId, deviceId} = data
    const user = await User.findById(ObjectID(userId)).populate('device')
    let exists = user.device.find((device)=>{
        return ObjectID(device._id).toString() == deviceId
    })

    if(!exists){
        user.device.push(ObjectID(deviceId))
        await user.save()
    }
    const userWithDevice = await User.findById(ObjectID(userId)).populate('device')
    
    return userWithDevice
}

export const deleteUser = async (parent, {data}, ctx, info)=>{
    const { userId: id } = data
    const user = await User.findByIdAndRemove( ObjectID(id) )
    return user
}