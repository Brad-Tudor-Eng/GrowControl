const graphql = require('graphql')
import DeviceType from './DeviceType'


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = graphql

const testDevice = [{deviceID: 'xyz987', dev_name: 'green_apple1', user:'abc123'}]

 const UserType = new GraphQLObjectType({
    name: "User",
    fields: ()=>({
        userID: {type: GraphQLID},
        email: {type: GraphQLString},
        devices: {
            type: new GraphQLList(DeviceType),
            async resolve(parentValue, args, ctx, info){
                return testDevice
            }
        }
    })
})

export default UserType