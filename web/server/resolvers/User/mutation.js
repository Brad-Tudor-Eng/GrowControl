import User from '../../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ObjectID } from 'mongodb'


//  create a new user       [x]         
//  update a user email     [x]
//  update a user password  []
//  delete a user           [x]

// jwt.verify(token, process.env.JWT_KEY)

export const createUser = async (parent, {data}, {req, auth}, info)=>{
    //check to see if user exists

    // cleanse input

    // validate password
    const {password} = data
    if(password.length < 5){throw new Error('password must be 8 chr or longer')}
    //if valid hash
    var hash = bcrypt.hashSync(password, 10);
    //create a new user
    const user = new User({...data,token:"" ,password: hash})
    //save user
    const newUser = await user.save()
    //login user
    //create a token for the user
    const token = jwt.sign({id: user._id},process.env.JWT_KEY,{ expiresIn: 30 * 24 * 60 * 60 })

    const test = await User.findByIdAndUpdate(ObjectID(newUser._id),{$set: {token}},{new: true})

    return test
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