const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {UserInputError} = require("apollo-server")

const User = require("../../models/User.tsx")
const {SECRET_KEY} = require("../../config")

type IRegister = {
    registerInput: IRegisterInput
}
type IRegisterInput = {
    username: String,
    email: String,
    password: String,
    confirmPassword: String
}

module.exports = {
    Mutation: {
        async register(_: any, {registerInput: {username, email, password, confirmPassword}}: IRegister){
            
            const user = await User.findOne({email})
            if(user){
                throw new UserInputError('Email already exist', {
                    errors: {
                        email: 'This email already exist'
                    }
                })
            }
            password = await bycrypt.hash(password, 12)

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            const result = await newUser.save()

            const token = jwt.sign({
                id: result.id,
                username: result.username,
                email: result.email
            }, SECRET_KEY, {expiresIn: '1h'})

            return {
                ...result._doc,
                id: result._id,
                token
            }
        }
    }
}