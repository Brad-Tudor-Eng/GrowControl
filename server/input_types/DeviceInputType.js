const graphql = require('graphql')

const {
    GraphQLString,
    GraphQLInputObjectType
} = graphql

export default new GraphQLInputObjectType({
    name: "UserInputType",
    fields: ()=>({
        email: {type: GraphQLString},
    })
})