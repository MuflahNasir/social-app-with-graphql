export {}
const Post = require("../../models/Post")
const checkAuth = require("../../utils/check_auth")
const {UserInputError} = require("apollo-server")

type ICreatePost = {
    postId: String,
    body: String
}

module.exports = {
    Mutation: {
        createComment: async(_: any, {postId, body}: ICreatePost, context: any) => {
            const user = checkAuth(context)
            if(user){
                if(body.trim() === ''){
                    throw new UserInputError('Empty Comment',{
                        errors: {
                            body: "Comment body cannot be empty"
                        }
                    })
                }
                const post = await Post.findById(postId)
                if(post){
                    post.comments.unshift({
                        body, 
                        username: user.username,
                        createdAt: new Date().toISOString()
                    })
                    await post.save()
                    return post
                } else throw new UserInputError('Post not found')
            }
        }
    }
}