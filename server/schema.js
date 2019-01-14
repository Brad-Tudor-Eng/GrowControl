const graphql = require('graphql')
const { GraphQLSchema } = graphql

import RootQueryType from './queries/RootQueryType'
import mutation from './mutations/RootMutation'



module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation
})