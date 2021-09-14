const PostResolvers = require("./posts.tsx")

module.exports = {
    Query: {
        ...PostResolvers.Query
    }
}