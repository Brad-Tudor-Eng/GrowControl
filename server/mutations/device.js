const graphql = require('graphql')

//Mongoose Models
import User from '../models/User'
import Device from '../models/Device'
import Record from '../models/Record'

//GraphQL Model Types
import UserType from '../types/UserType'
import DeviceType from '../types/DeviceType'
import RecordType from '../types/RecordType'

//GraphQL Input Types
import UserInputType from '../input_types/UserInputType'

const db = require('mongodb')

const {
    GraphQLString
} = graphql

//can add a device to a user        []
//can modify a devices' name        []
//can modify a devices' settings    []
//can delete a device from a user   []

export const addDevice = {
    type: DeviceType,
    args: { data: {type: UserInputType} },
    resolve(parentValue, args, ctx, info){
        console.log(args.data.email)
    }
}

export const updateDeviceName = {
    type: DeviceType,
    args: { data: {type: UserInputType} },
    resolve(parentValue, args, ctx, info){
        console.log(args.data.email)
    }
}

export const updateDeviceSettings = {
    type: DeviceType,
    args: { data: {type: UserInputType} },
    resolve(parentValue, args, ctx, info){
        console.log(args.data.email)
    }
}

export const deleteDevice = {
    type: DeviceType,
    args: { data: {type: UserInputType} },
    resolve(parentValue, args, ctx, info){
        console.log(args.data.email)
    }
}