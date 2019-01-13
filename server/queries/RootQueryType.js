const graphql = require('graphql')
import UserType from '../types/UserType'

const {
    GraphQLObjectType
} = graphql

//test data
const testUser =   {userID: 'abc123', email: 'a@b.com'}
const testDevice = {}
const testRecord = {}




const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        user: {
            type: UserType,
            async resolve(parentValue, args, ctx, info){
                return testUser
            }
        }
    }
})

export default RootQueryType