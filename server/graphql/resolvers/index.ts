const PostResolvers = require("./posts.tsx")
const UserResolvers = require("./users.tsx")

module.exports = {
    Query: {
        ...PostResolvers.Query
    },
    Mutation: {
        ...UserResolvers.Mutation,
        ...PostResolvers.Mutation
    }
}