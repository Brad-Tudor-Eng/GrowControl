// find all devices associated with user
import Device from '../../models/Device'
import { ObjectID } from 'mongodb'

export const findUserDevices = async (parent, {data}, ctx, info) =>{
    const { userId: id } = data
    const devices = await Device.find({user: ObjectID(id)})
    return devices
}