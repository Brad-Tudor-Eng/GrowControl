const graphql = require('graphql')

const {
    GraphQLString,
    GraphQLInputObjectType
} = graphql

export const newUserInputType = new GraphQLInputObjectType({
    name: "newUserInputType",
    fields: ()=>({
        email: {type: GraphQLString},
    })
})