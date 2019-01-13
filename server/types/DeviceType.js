const graphql = require('graphql')
import UserType from './UserType'
import RecordType from './RecordType'

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt
} = graphql

const testUser =   {userID: 'abc123', email: 'a@b.com', devices: ['xy987']}
const testDevice = {deviceID: 'xyz987', dev_name: 'green_apple1', user:'abc123'}

//settingValueType
const SettingValueType = new GraphQLObjectType({
    name: "SettingValue",
    fields: ()=>({
        average: {type: GraphQLInt},
        tol: {type: GraphQLInt}
    })
})

//settingType
const DeviceSettingsType = new GraphQLObjectType({
    name: "DeviceSettings",
    fields:()=>({
        light: {type: SettingValueType},
        temp: {type: SettingValueType},
        humidity: {type: SettingValueType},
        moisture: {type: SettingValueType}
    })
})



const DeviceType = new GraphQLObjectType({
    name: "Device",
    fields: ()=>({
        deviceID: {type: GraphQLID},
        dev_name: {type: GraphQLString},
        user: {
            type: UserType,
            async resolve(parentValue, args, ctx, info){
                return testUser
            }
        },
        //TODO: Add resolver for deviceSettingsType
        settings: {type: DeviceSettingsType},
        //TODO: Add resolver for record Type
        records: {type: RecordType}
    })
})

export default DeviceType