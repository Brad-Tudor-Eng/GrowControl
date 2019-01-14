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
import { newUserInputType } from '../input_types/UserInputType'

const db = require('mongodb')

const {
    GraphQLString
} = graphql

// can add a user               []
// can update a users email     []
// can update a users password  []
// can delete a user email      []


export const addUser = {
    type: UserType,
    args: { data: { type: newUserInputType } },
    resolve(parentValue, args, ctx, info){
        console.log(args.data.email)
    }
}

export const updateUserEmail = {
    type: UserType,
    args: { data: { type: newUserInputType } },
    resolve(parentValue, args, ctx, info){
        console.log(args.data.email)
    }
}

export const updateUserPassword = {
    type: UserType,
    args: { data: { type: newUserInputType } },
    resolve(parentValue, args, ctx, info){
        console.log(args.data.email)
    }
}

export const deleteUser = {
    type: UserType,
    args: { data: { type: newUserInputType } },
    resolve(parentValue, args, ctx, info){
        console.log(args.data.email)
    }
}