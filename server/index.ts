const { ApolloServer } = require('apollo-server')
const mongoose = require("mongoose")
 
const {MONGODB} = require("./config.ts")
const typeDefs = require("./graphql/typeDefs.tsx")
const resolvers = require("./graphql/resolvers")

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB connected successfuly")
        return server.listen({port: 5000})
    }).then((res: any) => {
        console.log(`Server is running at ${res.url}`)
    })