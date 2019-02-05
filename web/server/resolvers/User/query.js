import { ObjectID } from 'mongodb'
import User from '../../models/User'
import jwt from 'jsonwebtoken'

//find the user,
//look at user devices
//if devices have records strip data away from all but first
//return user



export const findUser = async (parent, {data}, ctx, info) =>{
    let token = data.token
    token = jwt.verify(token, process.env.JWT_KEY)
    const id = ObjectID(token.id)
    let user = await User.findById(id).populate('device')
    if(user){
//fix nested loop
        if (user.device.length > 0){
            let devices = user.device
            devices.forEach((device,i)=>{
                let records = device.records
                records = records.map((record,i)=>{
                    return i === (records.length-1) ? record : { date: record.date, data: [] } 
                })
                device.records = records
            })
            user.device = devices
        }

        return user
    }else{
        throw new Error('Invalid Token')
    }
    return null
}

