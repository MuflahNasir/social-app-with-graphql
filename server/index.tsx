const { ApolloServer } = require('apollo-server')
const gql = require("graphql-tag")
const mongoose = require("mongoose")

const Post = require("./models/Post ")
const {MONGODB} = require("./config.ts")

const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => "Hello World"
    }
} 

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB connected successfuly")
        return server.listen({port: 5000})
    }).then(res => {
        console.log(`Server is running at ${res.url}`)
    })