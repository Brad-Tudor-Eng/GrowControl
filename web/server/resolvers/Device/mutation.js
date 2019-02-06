import Device from '../../models/Device'
import User from '../../models/User'
import { ObjectID } from 'mongodb'
import jwt from 'jsonwebtoken'

//   Add a device to the database [x]
//   Update Device Settings [x]
//   Update Device Name     [x]
//   Delete Device          [x]

const defaultSettings = { 
    light: { average: 700, tol: 5}, 
    temp: { average: 75, tol: 5 }, 
    humidity: { average: 85, tol: 5 }, 
    moisture: { average: 75, tol: 5 }
}


export const updateDevice = async (parent, {data}, ctx, info) => {
    
    const verify = jwt.verify(data.token, process.env.JWT_KEY)

    let {deviceId: id, name: dev_name, settings} = data  
    if(verify){
        const update = {}
        
            update.dev_name = dev_name    
            update.settings = settings 

        const device = await Device.findByIdAndUpdate( 
            ObjectID(id), 
            {$set: update}, 
            {new: true}).populate('user')
        
        return device
    }else{
        throw new Error('verification needed')
    }

}

export const addDeviceToUser = async (parent, {data}, ctx, info) =>{
    //verify the user
    const verify = jwt.verify(data.token, process.env.JWT_KEY) 
     
    if(verify){
        let {deviceName, userId} = data
        userId = ObjectID(userId)
        //find the user in the database
        let user = await User.findById(userId).populate('device')
        //check to see if the user has a device with the same name
        let exists = user.device.find((device)=>{
            return deviceName === device.dev_name
        })

        if(!exists){
            // create a new device for the user
            let newDev = new Device({
                
                    dev_name: deviceName,
                    user: userId,
                    settings: defaultSettings,
                    records: [ ]
                }
            )
            //save the device to the database
                await newDev.save()
            //save the user to the database
                user.device.push(newDev._id)
                await user.save()
            //return new device
            return newDev
        }else{
            throw new Error('device already exists')
        }
    }else{
        throw new Error('unverified request')
    }
}

export const deleteDevice = async (parent, {data}, ctx, info) => {
    
    const { deviceId: id } = data
    const device = await Device.findByIdAndRemove( ObjectID(id) )
    
    return device
}
