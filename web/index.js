import { GraphQLServer, PubSub }    from 'graphql-yoga'

import mongoose                     from 'mongoose'
import Query                        from './server/resolvers/Query'
import Mutation                     from './server/resolvers/Mutation'
import Subscription                 from './server/resolvers/Subscription'
import cookieParser                 from 'cookie-parser'
import bodyParser                   from 'body-parser'
import cors                         from 'cors'

import verifyToken                  from './server/services/verifyToken'

require('dotenv').config()
require('./server/broker/index')

export const pubsub = new PubSub()

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})

const server = new GraphQLServer({
    typeDefs: './server/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription
    },
    context:(ctx)=>{
        return {
        req: ctx.request,
        pubsub
    }
}
})

server.use(cookieParser())
server.use(bodyParser.urlencoded({extended: false}))
server.use( cors() )

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

