const PostResolvers = require("./posts.tsx")
const UserResolvers = require("./users.tsx")
const CommentResolvers = require("./comments.tsx")

module.exports = {
    Query: {
        ...PostResolvers.Query
    },
    Mutation: {
        ...UserResolvers.Mutation,
        ...PostResolvers.Mutation,
        ...CommentResolvers.Mutation
    }
}