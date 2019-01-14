const graphql = require('graphql')
import UserType from '../types/UserType'

const {
    GraphQLObjectType
} = graphql

import {user} from './user'



const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        user
    }
})

export default RootQueryType