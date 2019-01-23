import { GraphQLServer, PubSub }    from 'graphql-yoga'
import mongoose                     from 'mongoose'
import Query                        from './server/resolvers/Query'
import Mutation                     from './server/resolvers/Mutation'
import Subscription                 from './server/resolvers/Subscription'
import cors                         from 'cors'

require('dotenv').config()
require('./server/broker/index')

export const pubsub = new PubSub()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})

const server = new GraphQLServer({
    typeDefs: './server/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription
    },
    context:{
        pubsub
    }

})

server.express.use(cors())

const gqlEndpoint = '/gql'
const gqlsubscribe = '/subscribe'

const options = {
    port: process.env.PORT,
    endpoint: gqlEndpoint,
    subscriptions: gqlsubscribe,
    playground: gqlEndpoint
}



server.start( options, ()=>{
    console.log('server has started')
})

