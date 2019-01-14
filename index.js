import express from 'express'
import graphqlHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import path from 'path'

import mongoose from 'mongoose'

//Routing File
import routes from './server/routes'
//use .env file
require('dotenv').config()
//graphQL Schema
import schema from './server/schema'

const app = express()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})

//Middleware
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"dist")))

//intilize routing
routes(app)
//Start Server
app.listen(3000, ()=>{
    console.log('started')
})
