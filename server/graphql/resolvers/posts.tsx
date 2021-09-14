const Post = require("../../models/Post.tsx")

module.exports = {
    Query: {
        async getPosts(){
            try {
                const posts = await Post.find() 
                return posts
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
} 