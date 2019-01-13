const graphql = require('graphql')
import UserType from './UserType'
import { resolve } from 'url';

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLList
} = graphql

const DataType = new GraphQLObjectType({
    name: "data",
    fields: ()=>({
        time: {type: GraphQLString},
        light: {type: GraphQLFloat},
        temp: {type: GraphQLFloat},
        humidity: {type: GraphQLFloat},
        moisture: {type: GraphQLFloat}
    })
})

const RecordType = new GraphQLObjectType({
    name: "record",
    fields:()=>({
        recordID: {type: GraphQLString},
        date: {type: GraphQLString},
        data: {
            type: new GraphQLList(DataType),
            async resolve(parentValue, args, ctx, info){
                //TODO Add resolver for 
            }
        }
    })
})

export default RecordType