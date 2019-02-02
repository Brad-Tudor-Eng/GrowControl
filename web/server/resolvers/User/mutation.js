import User from '../../models/User'
import jwt from 'jsonwebtoken'
import {
    signUp,
    login,
    logOut
} from '../../services/authService'
import bcrypt from 'bcryptjs'
import { ObjectID } from 'mongodb'


//  create a new user       [x]
//  log a user in           [x]
//  log a user out          [x]

//  update a user email     [x]
//  update a user password  [x]
//  delete a user           [x]

// jwt.verify(token, process.env.JWT_KEY)

export const createUser = async (parent, {data}, { req }, info)=>{        
    return signUp(data)
}

export const loginUser = async (parent, {data}, { req }, info)=>{ 
    return login(data)
}

export const logout = async (parent, {data}, { req }, info)=>{
    return logOut(data)
}

export const updateUser = async (parent, {data}, ctx, info)=>{
    const token = data.token
    const verify = jwt.verify(token, process.env.JWT_KEY)
    if(verify){
        let user = await User.findById( ObjectID(data.userId)) 
            if(ObjectID(user._id).toString() === verify.id){
                if(data.email){
                    let lowerCaseEmail = data.email.toLowerCase() 
                    user.email = lowerCaseEmail
                }
                if(data.password){
                    var hash = bcrypt.hashSync(data.password, 10)
                    user.password = hash
                }
                user.save()
                return user
            }
    }else{ return null }

}

export const addDeviceToUser = async (parent, {data}, ctx, info) =>{
    const verify = jwt.verify(data.token, process.env.JWT_KEY)  
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
    console.log('delete user')
    const { userId: id } = data 
    const user = await User.findByIdAndRemove( ObjectID(id) )
    return user
}
