import { GraphQLServer, PubSub }    from 'graphql-yoga'
import mongoose                     from 'mongoose'
import Query                        from './server/resolvers/Query'
import Mutation                     from './server/resolvers/Mutation'
import Subscription                 from './server/resolvers/Subscription'
require('dotenv').config()

const pubsub = new PubSub()

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

const gqlEndpoint = '/gql'

const options = {
    port: 3000,
    endpoint: gqlEndpoint,
    subscriptions: gqlEndpoint,
    playground: gqlEndpoint
}

const app = server.express

app.get('/', (req,res)=>{
    res.send('home')
})

server.start( options, ()=>{
    console.log('server has started')
})