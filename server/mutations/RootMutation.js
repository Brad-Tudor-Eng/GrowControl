const graphql = require('graphql')


import { addUser, updateUserEmail, updateUserPassword, deleteUser } from './user'
import { addDevice, updateDeviceName, updateDeviceSettings, deleteDevice } from './device'
import { addRecord } from './record'

const {
    GraphQLObjectType,
} = graphql




const Mutation = new GraphQLObjectType({
    name: "mutations",
    fields: {
        addUser,
        addDevice,
        addRecord,
        updateUserEmail,
        updateUserPassword,
        updateDeviceName,
        updateDeviceSettings,
        deleteUser,
        deleteDevice
    }
})

export default Mutation