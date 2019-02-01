import { GraphQLServer, PubSub }    from 'graphql-yoga'


import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'


import mongoose                     from 'mongoose'
import Query                        from './server/resolvers/Query'
import Mutation                     from './server/resolvers/Mutation'
import Subscription                 from './server/resolvers/Subscription'

import cors                         from 'cors'

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
    context:(req)=>{
        return {
        res: req.res,
        req: req.request,
        pubsub
    }
}
})

const app = server.express

app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors())



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

