const gql = require("graphql-tag")

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comments]!
        likes: [likes]!
    }
    type Comments{
        id: ID!,
        body: String!
        username: String!
        createdAt: String!
    }
    type likes {
        id: ID!
        username: String!
        createdAt: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query{
        getPosts: [Post]
        getPost(postId: String!): Post
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User! 
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: String!, commentId: String!): Post!
        likePost(postId: String!): Post!
    }
`