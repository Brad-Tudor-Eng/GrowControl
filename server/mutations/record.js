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


export const addRecord = {
    type: RecordType,
    args: { data: {type: UserInputType} },
    resolve(parentValue, args, ctx, info){
        console.log(args.data.email)
    }
}
