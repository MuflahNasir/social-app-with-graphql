const Post = require("../../models/Post.tsx")
const checkAuth = require("../../utils/check_auth")

const {AuthenticationError} = require("apollo-server")

type IBody = {
    body: String
}

module.exports = {
    Query: {
        async getPosts(){
            try {
                const posts = await Post.find().sort({createdAt: -1})
                return posts
            } catch (error: any) {
                throw new Error(error)
            }
        },
        async getPost(_: any,{ postId }: any){
            try {
                const post = await Post.findById(postId)
                if(post){
                    return post
                } else{
                    throw new Error('Post not found') 
                }
            } catch (error: any) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        async createPost(_: any, {body}: IBody, context: any){
             const user = checkAuth(context)
             if(user){
                 const newPost = await Post({
                     body,
                     user: user.id,
                     username: user.username,
                     createdAt: new Date().toISOString()
                 })
                 const post = newPost.save()
                 return post
             }
             else{
                 throw new Error('User is not authenticated')
             }
        },
        async deletePost(_: any, {postId}: any, context: any){
            const user = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                if(post.username === user.username){
                    post.delete()
                    return 'Post Deleted'
                } else{
                    throw new AuthenticationError('You are not the owner of this post')
                }
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
} 