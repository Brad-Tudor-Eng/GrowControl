const graphql = require('graphql')
const { GraphQLSchema } = graphql

import RootQueryType from './queries/RootQueryType'






module.exports = new GraphQLSchema({
    query: RootQueryType
})