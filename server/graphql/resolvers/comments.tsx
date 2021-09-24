export {}
const Post = require("../../models/Post")
const checkAuth = require("../../utils/check_auth")
const {UserInputError, AuthenticationError} = require("apollo-server")

type ICreatePost = {
    postId: String,
    body: String
}

type IDeleteCom = {
    postId: String,
    commentId: String
}

type Comments = {
    id: String,
    body: String,
    username: String,
    createdAt: String
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
        },
        async deleteComment(_:any, {postId, commentId}: IDeleteCom, context: any){
            const {username}  = checkAuth(context)
            const post = await Post.findById(postId)

            if(post){
                const commentIndex = post.comments.findIndex((c:Comments) => c.id === commentId)

                if(post.comments[commentIndex].username === username){
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                } else{
                    throw new AuthenticationError('Action not allowed')
                }
            } else{
                throw new UserInputError('Post not found')
            }
        }
    }
}