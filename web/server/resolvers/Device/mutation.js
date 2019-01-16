import Device from '../../models/Device'
import { ObjectID } from 'mongodb'
//   Add a device to the database [x]
//   Add a device to a user []
//   Update Device Settings [x]
//   Update Device Name     [x]
//   Delete Device          []

const defaultSettings = {
    light: {average: 0, tol: 0},
    temp: {average: 0, tol: 0},
    humidity: {average: 0, tol: 0},
    moisture: {average: 0, tol: 0}
}

export const addDevice = async (parent, {data}, ctx, info) => {
    let { name, userID} = data
    
    userID ? userID = ObjectID(userID) : userID;

    const deviceProperties = {
        dev_name: name,
        user: userID,
        settings: defaultSettings,
        records: []
    }

    const d = await Device.create({...deviceProperties})
    const device = await Device.findById( d._id ).populate('user')
    return device
}


export const updateDevice = async (parent, {data}, ctx, info) => {
    let {id, name: dev_name, userID, settings} = data
    const update = {}
    if(dev_name){ update.dev_name = dev_name }
    if(settings){ 
        settings = { ...defaultSettings, ...settings}
        update.settings = settings }
    if(userID){ update.user = ObjectID( userID ) }

    const device = await Device.findByIdAndUpdate( 
        ObjectID(id), 
        {$set: update}, 
        {new: true}).populate('user')
    return device
}

// export const deleteDevice = async (parent, {data}, ctx, info) => {
//     const { id } = data
//     const device = await Device.findByIdAndRemove( ObjectID(id) )
//     return device
// }